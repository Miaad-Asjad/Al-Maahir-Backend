


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


// import multer from "multer";
// import { join } from "path";
// import fs from "fs";

// const uploadDir = join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (_req, file, cb) => {
//     const ext = file.originalname.split(".").pop();
//     const name = `${Date.now()}-${Math.random()
//       .toString(36)
//       .slice(2, 8)}.${ext}`;
//     cb(null, name);
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//    fileSize: 300 * 1024 * 1024, 

//   },
// });

// /* ================= FILE UPLOAD MIDDLEWARES ================= */

// export const uploadEnrollmentFile = (req, res, next) => {
//   upload.single("file")(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({
//         message: "Enrollment file upload failed",
//         error: err.message,
//       });
//     }
//     next();
//   });
// };

// export const uploadResourceFile = (req, res, next) => {
//   upload.single("file")(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({
//         message: "Resource file upload failed",
//         error: err.message,
//       });
//     }
//     next();
//   });
// };


import multer from "multer";
import { join } from "path";
import fs from "fs";

/* ================= CREATE UPLOAD FOLDER ================= */
const uploadDir = join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ================= STORAGE ================= */
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

/* ================= FILE FILTER (🔥 FIXED) ================= */
const fileFilter = (_req, file, cb) => {
  console.log("📂 FILE TYPE:", file.mimetype);

  // ✅ allow ALL audio
  if (file.mimetype.startsWith("audio/")) {
    return cb(null, true);
  }

  // ✅ allow images
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  // ✅ allow pdf
  if (file.mimetype === "application/pdf") {
    return cb(null, true);
  }

  return cb(
    new Error("Only audio, image, and PDF files are allowed"),
    false
  );
};

/* ================= MULTER INSTANCE ================= */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 300 * 1024 * 1024, // 300MB
  },
});

/* ================= ENROLLMENT UPLOAD ================= */
export const uploadEnrollmentFile = (req, res, next) => {
  upload.any()(req, res, (err) => { // ✅ allows multiple files
    if (err) {
      console.log("❌ FILE UPLOAD ERROR:", err.message);
      return res.status(400).json({
        message: "Enrollment file upload failed",
        error: err.message,
      });
    }

    console.log("✅ FILES RECEIVED:", req.files); // array of files
    next();
  });
};


/* ================= RESOURCE UPLOAD ================= */
export const uploadResourceFile = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.log("❌ RESOURCE ERROR:", err.message);
      return res.status(400).json({
        message: "Resource upload failed",
        error: err.message,
      });
    }

    next();
  });
};