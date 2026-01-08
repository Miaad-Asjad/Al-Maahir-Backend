


// import multer from "multer";
// import { join } from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// const __dirname = fileURLToPath(new URL(".", import.meta.url));

// const uploadDir = join(__dirname, "..", "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => cb(null, uploadDir),
//   filename: (_req, file, cb) => {
//     const ext = file.originalname.split(".").pop();
//     const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
//     cb(null, name);
//   }
// });

// const upload = multer({ storage });

// export const single = (fieldName) => upload.single(fieldName);
// export const anyFiles = () => upload.any();


import multer from "multer";
import { join } from "path";
import fs from "fs";

const uploadDir = join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const name = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // ✅ 50MB limit (optional safety)
  },
});

/* ================= FILE UPLOAD MIDDLEWARES ================= */

export const uploadEnrollmentFile = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Enrollment file upload failed",
        error: err.message,
      });
    }
    next();
  });
};

export const uploadResourceFile = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Resource file upload failed",
        error: err.message,
      });
    }
    next();
  });
};
