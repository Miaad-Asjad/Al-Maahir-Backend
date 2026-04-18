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


// import { Router } from "express";
// import {
//   getResources,
//   uploadResource,
//   deleteResource,
//   updateResource,
// } from "../controllers/resourceController.js";

// import { uploadResourceFile } from "../middleware/uploadMiddleware.js";
// import { requireAdmin } from "../middleware/authMiddleware.js";

// const router = Router();

// router.get("/", getResources);


// router.post(
//   "/upload", 
//   requireAdmin,       
//   uploadResource
// );

// router.delete("/:id", requireAdmin, deleteResource);
// router.put("/:id", requireAdmin, updateResource);

// export default router;



import { Router } from "express";
import {
  getResources,
  uploadResource,
  deleteResource,
  updateResource,
  getCloudinarySignature, 
} from "../controllers/resourceController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getResources);

// 🔥 NEW ROUTE
router.get("/signature", getCloudinarySignature);

router.post("/upload", requireAdmin, uploadResource);

router.delete("/:id", requireAdmin, deleteResource);
router.put("/:id", requireAdmin, updateResource);

export default router;