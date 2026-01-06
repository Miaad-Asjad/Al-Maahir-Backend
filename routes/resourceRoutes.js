// import { Router } from "express";
// import { getResources, uploadResource, deleteResource, updateResource } from "../controllers/resourceController.js";
// import { single } from "../middleware/uploadMiddleware.js";
// import { requireAdmin } from "../middleware/authMiddleware.js";

// const router = Router();

// router.get("/", getResources);
// router.post("/upload", requireAdmin, single, uploadResource);

// router.delete("/:id", requireAdmin, deleteResource);
// router.put("/:id", requireAdmin, updateResource);

// export default router;


import { Router } from "express";
import {
  getResources,
  uploadResource,
  deleteResource,
  updateResource,
} from "../controllers/resourceController.js";
import { uploadResourceFile } from "../middleware/uploadMiddleware.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getResources);

/* ✅ Resource upload me file required */
router.post("/upload", requireAdmin, uploadResourceFile, uploadResource);

router.delete("/:id", requireAdmin, deleteResource);
router.put("/:id", requireAdmin, updateResource);

export default router;
