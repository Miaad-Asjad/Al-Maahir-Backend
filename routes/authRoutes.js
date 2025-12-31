console.log("🔥 AUTH ROUTES FILE LOADED!");
import { Router } from "express";
import { adminLogin, createAdminIfNotExists, } from "../controllers/authController.js";

const router = Router();

createAdminIfNotExists();

router.post("/login", adminLogin);

export default router;
