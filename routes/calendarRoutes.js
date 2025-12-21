import { Router } from "express";
import { getAll, create, deleteOne } from "../controllers/calendarController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAll);
router.post("/", requireAdmin, create);
router.delete("/:id", requireAdmin, deleteOne);

export default router;
