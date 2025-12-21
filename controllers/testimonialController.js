import Testimonial from "../models/Testimonial.js";

/* ======================================================
   CREATE TESTIMONIAL (ADMIN)
====================================================== */
export async function create(req, res) {
  try {
    const { name, course, text } = req.body;

    if (!name || !text) {
      return res.status(400).json({
        message: "Name and testimonial text are required.",
      });
    }

    const testimonial = new Testimonial({
      name: name.trim(),
      course: course?.trim() || "",
      text: text.trim(),
    });

    await testimonial.save();

    res.json(testimonial);
  } catch {
    res.status(500).json({
      message: "Failed to create testimonial.",
    });
  }
}

/* ======================================================
   GET ALL TESTIMONIALS (PUBLIC / ADMIN)
====================================================== */
export async function getAll(_req, res) {
  try {
    const list = await Testimonial.find().sort({ createdAt: -1 });
    res.json(list);
  } catch {
    res.status(500).json({
      message: "Failed to load testimonials.",
    });
  }
}

/* ======================================================
   DELETE TESTIMONIAL (ADMIN)
====================================================== */
export async function deleteOne(req, res) {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Testimonial not found.",
      });
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({
      message: "Failed to delete testimonial.",
    });
  }
}

