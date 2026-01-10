


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


// import connectDB from "./config/db.js";


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


// export const io = new Server(server, {
//   cors: {
//     origin: [
//       "https://www.almaahir.online",
//       "https://almaahir.online",
//       "http://localhost:5173",
//     ],
//   },
// });

// io.on("connection", () => {});


// connectDB();
// await createAdminIfNotExists();


// app.use(
//   cors({
//     origin: [
//       "https://www.almaahir.online",
//       "https://almaahir.online",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//   })
// );

// app.options("*", cors());
// app.use(express.json());


// app.use("/uploads", express.static(join(__dirname, "uploads")));


// app.use("/api/admin", authRoutes);
// app.use("/api/courses", courseRoutes);
// app.use("/api/enroll", enrollRoutes);
// app.use("/api/resources", resourceRoutes);
// app.use("/api/testimonials", testimonialRoutes);
// app.use("/api/calendar", calendarRoutes);
// app.use("/api/contact", contactRoutes);


// app.get("/api/health", (_req, res) => {
//   res.json({ ok: true });
// });


// const PORT = process.env.PORT || 2000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });




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

// import connectDB from "./config/db.js";

// import courseRoutes from "./routes/courseRoutes.js";
// import enrollRoutes from "./routes/enrollRoutes.js";
// import resourceRoutes from "./routes/resourceRoutes.js";
// import testimonialRoutes from "./routes/testimonialRoutes.js";
// import calendarRoutes from "./routes/calendarRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import { createAdminIfNotExists } from "./controllers/authController.js";

// /* ================= ALLOWED ORIGINS ================= */
// const allowedOrigins = [
//   "https://www.almaahir.online",
//   "https://almaahir.online",
//   "https://al-maahir-frontend.vercel.app",
//   "http://localhost:5173",
// ];

// const app = express();
// const server = createServer(app);

// /* ================= SOCKET IO ================= */
// export const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     credentials: true,
//   },
// });

// io.on("connection", () => {});

// /* ================= DATABASE ================= */
// connectDB();
// await createAdminIfNotExists();

// /* ================= CORS CONFIG ================= */
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       console.log("🌐 Request origin:", origin);

//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(null, false);
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


// // ✅ Allow all OPTIONS preflight requests
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") return res.sendStatus(204);
//   next();
// });

// /* ================= BODY PARSER ================= */
// app.use(express.json());

// /* ================= STATIC UPLOADS ================= */
// app.use("/uploads", express.static(join(__dirname, "uploads")));

// /* ================= ROUTES ================= */
// app.use("/api/admin", authRoutes);
// app.use("/api/courses", courseRoutes);
// app.use("/api/enroll", enrollRoutes);
// app.use("/api/resources", resourceRoutes);
// app.use("/api/testimonials", testimonialRoutes);
// app.use("/api/calendar", calendarRoutes);
// app.use("/api/contact", contactRoutes);

// /* ================= HEALTH ================= */
// app.get("/api/health", (_req, res) => {
//   res.json({ ok: true });
// });

// /* ================= START SERVER ================= */
// const PORT = process.env.PORT || 2000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });





import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import connectDB from "./config/db.js";

import courseRoutes from "./routes/courseRoutes.js";
import enrollRoutes from "./routes/enrollRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { createAdminIfNotExists } from "./controllers/authController.js";

/* ================= ALLOWED ORIGINS ================= */
const allowedOrigins = [
  "https://www.almaahir.online",
  "https://almaahir.online",
  "https://al-maahir-frontend.vercel.app",
  "http://localhost:5173",
];

const app = express();
const server = createServer(app);

/* ============================================================
   🚨 FORCE CORS FIX — MUST BE BEFORE ALL ROUTES & MIDDLEWARES
============================================================ */
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ================= SOCKET IO ================= */
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", () => {});

/* ================= DATABASE ================= */
connectDB();
await createAdminIfNotExists();

/* ================= EXPRESS CORS (secondary safety) ================= */
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/* ================= BODY PARSER ================= */
app.use(express.json());

/* ================= STATIC UPLOADS ================= */
app.use("/uploads", express.static(join(__dirname, "uploads")));

/* ================= ROUTES ================= */
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

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
