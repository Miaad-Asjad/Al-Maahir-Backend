


import multer from "multer";
import { join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const uploadDir = join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
    cb(null, name);
  }
});

const upload = multer({ storage });

export const single = upload.single("file");

export const anyFiles = () => upload.any();
