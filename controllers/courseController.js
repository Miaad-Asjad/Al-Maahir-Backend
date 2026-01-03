import Course from "../models/Course.js";
import slugify from "slugify";



export async function createCourse(req, res) {
  try {
    const {
      title,
      slug,
      feeStructure,
      formFields = [],
      ...rest
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        message: "Title and slug are required.",
      });
    }

    const fixedFeeStructure = Array.isArray(feeStructure)
      ? feeStructure
      : feeStructure
      ? [feeStructure]
      : [];

    const course = new Course({
      title,
      slug: slugify(slug, { lower: true, strict: true }),
      feeStructure: fixedFeeStructure,
      formFields,
      ...rest,
    });

    await course.save();
    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to create course." });
  }
}



export async function getAll(_req, res) {
  try {
    const list = await Course.find().sort({ createdAt: -1 });
    res.json(list);
  } catch {
    res.status(500).json({ message: "Failed to load courses." });
  }
}




export async function getBySlug(req, res) {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to load course." });
  }
}


export async function getById(req, res) {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to load course." });
  }
}



export async function updateCourse(req, res) {
  try {
    const data = { ...req.body };

    
    if (data.slug) {
      data.slug = slugify(data.slug, { lower: true, strict: true });
    }

    
    if (data.feeStructure) {
      data.feeStructure = Array.isArray(data.feeStructure)
        ? data.feeStructure
        : [data.feeStructure];
    }

    const course = await Course.findOneAndUpdate(
      { slug: req.params.slug },
      data,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to update course." });
  }
}


export async function deleteCourse(req, res) {
  try {
    const deleted = await Course.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to delete course." });
  }
}


export async function duplicateCourse(req, res) {
  try {
    const { slug } = req.params;

    const course = await Course.findOne({ slug });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const newCourse = new Course({
      ...course.toObject(),
      _id: undefined,
      slug: slugify(`${course.slug}-copy`, { lower: true, strict: true }),
      title: `${course.title} (Copy)`,
      createdAt: undefined,
      updatedAt: undefined,
    });

    await newCourse.save();
    res.json(newCourse);
  } catch {
    res.status(500).json({ message: "Failed to duplicate course." });
  }
}
