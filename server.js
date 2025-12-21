


// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import { join, dirname } from "path";
// import { fileURLToPath } from "url";
// import { createServer } from "http";
// import { Server } from "socket.io";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // DB
// import connectDB from "./config/db.js";

// // Routes
// import courseRoutes from "./routes/courseRoutes.js";
// import enrollRoutes from "./routes/enrollRoutes.js";
// import resourceRoutes from "./routes/resourceRoutes.js";
// import testimonialRoutes from "./routes/testimonialRoutes.js";
// import calendarRoutes from "./routes/calendarRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";

// import { createAdminIfNotExists } from "./controllers/authController.js";



// const app = express();
// const server = createServer(app);

// // 💥 REAL-TIME SOCKET.IO SERVER
// export const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("🔥 Admin Connected:", socket.id);
// });

// // DB Connect
// connectDB();
// createAdminIfNotExists();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Static folder for uploads
// app.use("/uploads", express.static(join(__dirname, "uploads")));

// // ROUTES
// app.use("/api/admin", authRoutes);
// app.use("/api/courses", courseRoutes);
// app.use("/api/enroll", enrollRoutes);
// app.use("/api/resources", resourceRoutes);
// app.use("/api/testimonials", testimonialRoutes);
// app.use("/api/calendar", calendarRoutes);
// app.use("/api/contact", contactRoutes);

// // Health Check
// app.get("/api/health", (_req, res) => res.json({ ok: true }));

// // SERVER START
// const PORT = process.env.PORT || 2000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server with Real-Time Notifications running on ${PORT}`)
// );






import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

/* ================= PATH SETUP ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ================= DB ================= */
import connectDB from "./config/db.js";

/* ================= ROUTES ================= */
import courseRoutes from "./routes/courseRoutes.js";
import enrollRoutes from "./routes/enrollRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import { createAdminIfNotExists } from "./controllers/authController.js";

/* ================= APP ================= */
const app = express();
const server = createServer(app);

/* ================= SOCKET.IO ================= */
export const io = new Server(server, {
  cors: { origin: "*" },
});

// ❌ no console spam
io.on("connection", () => {});

/* ================= INIT ================= */
connectDB();
createAdminIfNotExists();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= STATIC ================= */
app.use("/uploads", express.static(join(__dirname, "uploads")));

/* ================= API ROUTES ================= */
app.use("/api/admin", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/contact", contactRoutes);

/* ================= HEALTH ================= */
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 2000;
server.listen(PORT);
