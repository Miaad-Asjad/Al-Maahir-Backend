


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




const app = express();
const server = createServer(app);


export const io = new Server(server, {
  cors: {
    origin: [
      "https://www.almaahir.online",
      "https://almaahir.online",
      "http://localhost:5173",
    ],
  },
});

io.on("connection", () => {});


connectDB();
await createAdminIfNotExists();


app.use(
  cors({
    origin: [
      "https://www.almaahir.online",
      "https://almaahir.online",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());


app.use("/uploads", express.static(join(__dirname, "uploads")));


app.use("/api/admin", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/contact", contactRoutes);


app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});


const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
