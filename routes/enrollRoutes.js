

// import { Router } from "express";
// import { createEnrollment, getAllEnrollments, getGroupedEnrollments, updateStatus } from "../controllers/enrollController.js";
// import { requireAdmin } from "../middleware/authMiddleware.js";
// import { single } from "../middleware/uploadMiddleware.js";

// const router = Router();


// router.post("/", single("file"), createEnrollment);


// router.get("/all", requireAdmin, getAllEnrollments);
// router.put("/:id/status", requireAdmin, updateStatus);


// router.get("/grouped", requireAdmin, getGroupedEnrollments);

// export default router;


import { Router } from "express";
import {
  createEnrollment,
  deleteEnrollment,
  getAllEnrollments,
  getGroupedEnrollments,
  updateStatus,
} from "../controllers/enrollController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

/*  ENROLLMENT */
router.post("/", createEnrollment);

/*  ADMIN ROUTES */
router.get("/all", requireAdmin, getAllEnrollments);
router.put("/:id/status", requireAdmin, updateStatus);
router.get("/grouped", requireAdmin, getGroupedEnrollments);
router.delete("/:id", requireAdmin, deleteEnrollment);

export default router;