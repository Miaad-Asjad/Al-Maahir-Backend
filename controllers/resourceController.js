import Resource from "../models/Resource.js";
import { join } from "path";
import fs from "fs/promises";


export async function uploadResource(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File is required.",
      });
    }

    const resource = new Resource({
      title: req.body.title || req.file.originalname,
      type: req.body.type || "pdf",
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      course: req.body.course || null,
    });

    await resource.save();

    res.json(resource);
  } catch {
    res.status(500).json({
      message: "Failed to upload resource.",
    });
  }
}


export async function getResources(_req, res) {
  try {
    const items = await Resource.find().sort({ createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({
      message: "Failed to load resources.",
    });
  }
}


export async function deleteResource(req, res) {
  try {
    const item = await Resource.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        message: "Resource not found.",
      });
    }

    const filePath = join(process.cwd(), "uploads", item.filename);

   
    try {
      await fs.unlink(filePath);
    } catch {
      // file already missing → ignore silently
    }

    await item.deleteOne();

    res.json({ success: true });
  } catch {
    res.status(500).json({
      message: "Failed to delete resource.",
    });
  }
}


export async function updateResource(req, res) {
  try {
    const updates = {};

    if (req.body.title) updates.title = req.body.title;
    if (req.body.type) updates.type = req.body.type;

    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Resource not found.",
      });
    }

    res.json(updated);
  } catch {
    res.status(500).json({
      message: "Failed to update resource.",
    });
  }
}

