


import { Router } from "express";
import {
  getAll,
  getBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  duplicateCourse,
  toggleEnrollment
} from "../controllers/courseController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();


router.get("/", getAll);


router.get("/:slug", getBySlug);


router.post("/", requireAdmin, createCourse);
router.put("/:slug", requireAdmin, updateCourse);
router.patch("/:slug/toggle-enrollment", toggleEnrollment);
router.delete("/:slug", requireAdmin, deleteCourse);


router.post("/:slug/duplicate", requireAdmin, duplicateCourse);


export default router;
