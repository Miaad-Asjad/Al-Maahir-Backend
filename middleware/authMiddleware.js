


import jwt from "jsonwebtoken";
import User from "../models/User.js";

const { verify } = jwt;

export async function requireAdmin(req, res, next) {
  try {
    const auth = req.headers.authorization || req.headers.Authorization;
    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });
    const token = auth.split(" ")[1];

    let payload;
    try {
      payload = verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(payload.id);
    if (!user || user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    // attach admin to req for downstream controllers
    req.admin = { id: user._id, email: user.email, name: user.name, role: user.role };
    next();
  } catch (err) {
    console.error("requireAdmin err:", err);
    res.status(500).json({ message: "Server error" });
  }
}
