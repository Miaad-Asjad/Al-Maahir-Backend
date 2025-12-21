import { Router } from "express";
import {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
  replyToMessage, // ✅ NEW
} from "../controllers/contactController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// User sends message
router.post("/", createMessage);



// Get all messages
router.get("/messages", requireAdmin, getMessages);

// Mark message as read
router.put("/:id/read", requireAdmin, markAsRead);

// Delete message
router.delete("/:id", requireAdmin, deleteMessage);

// ✉️ Reply to message (EMAIL TO USER)
router.post("/:id/reply", requireAdmin, replyToMessage);

export default router;
