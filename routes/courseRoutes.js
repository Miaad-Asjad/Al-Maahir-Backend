


import { Router } from "express";
import {
  getAll,
  getBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  duplicateCourse
} from "../controllers/courseController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Get all courses
router.get("/", getAll);

// IMPORTANT: get by slug
router.get("/:slug", getBySlug);

// Admin actions
router.post("/", requireAdmin, createCourse);
router.put("/:slug", requireAdmin, updateCourse);
router.delete("/:slug", requireAdmin, deleteCourse);


router.post("/:slug/duplicate", requireAdmin, duplicateCourse);


export default router;
