import { Router } from "express";
import {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
  replyToMessage, 
} from "../controllers/contactController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();


router.post("/", createMessage);




router.get("/messages", requireAdmin, getMessages);


router.put("/:id/read", requireAdmin, markAsRead);


router.delete("/:id", requireAdmin, deleteMessage);


router.post("/:id/reply", requireAdmin, replyToMessage);

export default router;
