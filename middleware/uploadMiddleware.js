
// import multer from "multer";
// import { join } from "path";
// import fs from "fs";

// /* ================= CREATE UPLOAD FOLDER ================= */
// const uploadDir = join(process.cwd(), "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// /* ================= STORAGE ================= */
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

// /* ================= FILE FILTER (🔥 FIXED) ================= */
// const fileFilter = (_req, file, cb) => {
//   console.log("📂 FILE TYPE:", file.mimetype);

//   // ✅ allow ALL audio
//   if (file.mimetype.startsWith("audio/")) {
//     return cb(null, true);
//   }

//   // ✅ allow images
//   if (file.mimetype.startsWith("image/")) {
//     return cb(null, true);
//   }

//   // ✅ allow pdf
//   if (file.mimetype === "application/pdf") {
//     return cb(null, true);
//   }

//   return cb(
//     new Error("Only audio, image, and PDF files are allowed"),
//     false
//   );
// };

// /* ================= MULTER INSTANCE ================= */
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 300 * 1024 * 1024, // 300MB
//   },
// });


// export const uploadEnrollmentFile = (req, res, next) => {
//   upload.any()(req, res, (err) => {
//     if (err) {
//       console.log("❌ FILE UPLOAD ERROR:", err.message);
//       return res.status(400).json({
//         message: "Enrollment file upload failed",
//         error: err.message,
//       });
//     }

//     console.log("🔥 FILES RECEIVED:", req.files); // IMPORTANT

//     next();
//   });
// };


// /* ================= RESOURCE UPLOAD ================= */
// export const uploadResourceFile = (req, res, next) => {
//   upload.single("file")(req, res, (err) => {
//     if (err) {
//       console.log("❌ RESOURCE ERROR:", err.message);
//       return res.status(400).json({
//         message: "Resource upload failed",
//         error: err.message,
//       });
//     }

//     next();
//   });
// };




// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// /* ================= STORAGE ================= */
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (_req, file) => {
//     console.log("📂 FILE TYPE:", file.mimetype);

//     return {
//       folder: "almaahir",
//       resource_type: "auto", 
//     };
//   },
// });


// /* ================= MULTER ================= */
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 300 * 1024 * 1024, // 300MB
//   },
// });

// /* ================= ENROLLMENT ================= */
// export const uploadEnrollmentFile = (req, res, next) => {
//   upload.any()(req, res, (err) => {
//     if (err) {
//       console.log("❌ CLOUDINARY ERROR:", err.message);
//       return res.status(400).json({
//         message: "Enrollment file upload failed",
//         error: err.message,
//       });
//     }

//     console.log("🔥 CLOUDINARY FILES:", req.files);
//     next();
//   });
// };

// /* ================= RESOURCE ================= */
// export const uploadResourceFile = (req, res, next) => {
//   upload.single("file")(req, res, (err) => {
//     if (err) {
//       console.log("❌ RESOURCE ERROR:", err.message);
//       return res.status(400).json({
//         message: "Resource upload failed",
//         error: err.message,
//       });
//     }

//     console.log("🔥 RESOURCE FILE:", req.file);
//     next();
//   });
// };



import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

/* ================= STORAGE ================= */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    console.log("📂 FILE TYPE:", file.mimetype);

    return {
      folder: "almaahir",
      resource_type: "auto", // 🔥 handles image/audio/video/pdf
    };
  },
});

/* ================= MULTER ================= */
const upload = multer({
  storage,
  limits: {
    fileSize: 300 * 1024 * 1024, // 300MB
  },
});

/* ================= ENROLLMENT ================= */
export const uploadEnrollmentFile = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      console.log("❌ CLOUDINARY ERROR:", err.message);
      return res.status(400).json({
        message: "Enrollment file upload failed",
        error: err.message,
      });
    }

    console.log("🔥 CLOUDINARY FILES:", req.files);

    // ✅ optional (if needed later)
    // req.file = req.files?.[0];

    next();
  });
};

/* ================= RESOURCE (🔥 FIXED) ================= */
export const uploadResourceFile = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      console.log("❌ RESOURCE ERROR:", err.message);
      return res.status(400).json({
        message: "Resource upload failed",
        error: err.message,
      });
    }

    console.log("🔥 RESOURCE FILES:", req.files);

    // 🔥 IMPORTANT FIX
    req.file = req.files?.[0];

    if (!req.file) {
      console.log("❌ NO FILE AFTER MULTER");
    }

    next();
  });
}