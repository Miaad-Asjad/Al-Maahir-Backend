
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

    

    next();
  });
};

/* RESOURCE (FIXED)  */
export const uploadResourceFile = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.log("❌ RESOURCE ERROR:", err.message);
      return res.status(400).json({
        message: "Resource upload failed",
        error: err.message,
      });
    }

    console.log("🔥 RESOURCE FILE:", req.file);

    if (!req.file) {
      console.log("❌ NO FILE RECEIVED");
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    next();
  });
};