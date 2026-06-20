




import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import sendEmail from "../utils/sendEmail.js";
import { acceptedEmail, rejectedEmail } from "../utils/emailTemplates.js";
import { io } from "../server.js";
import cloudinary from "../config/cloudinary.js";

/* ================= CREATE ================= */
export async function createEnrollment(req, res) {
  try {
    const { course, name, email, phone, courseName, customFields } = req.body;

    let courseId = course || null;
    let courseTitle = courseName || "";
    let courseSlug = "";

    /* ✅ fetch course */
    if (courseId) {
      const c = await Course.findById(courseId);
      if (c) {
        courseTitle = c.title;
        courseSlug = c.slug;
      }
    }

    /* ✅ parse custom fields */
    let parsedCustom = {};
    try {
      parsedCustom =
        typeof customFields === "string"
          ? JSON.parse(customFields)
          : customFields || {};
    } catch {
      parsedCustom = {};
    }

    /* ============================================================
       🔥 FIXED FILES HANDLING (IMPORTANT)
    ============================================================ */
    const uploadedFiles = {};

    if (req.body.files && typeof req.body.files === "object") {
      for (const key in req.body.files) {
        const file = req.body.files[key];

        if (file && file.url && file.public_id) {
          uploadedFiles[key] = {
            url: file.url,
            public_id: file.public_id,
          };
        }
      }
    }

    console.log("📦 BODY:", req.body);
    console.log("📁 FILES:", uploadedFiles);

    /* ================= SAVE ================= */
    const enrollment = new Enrollment({
      course: courseId,
      courseName: courseTitle,
      courseSlug,
      name,
      email,
      phone,
      customFields: parsedCustom,
      files: uploadedFiles,
    });

    await enrollment.save();

    console.log("✅ ENROLLMENT SAVED");

    /* ================= REALTIME ================= */
    io.emit("new-enrollment", {
      student: name,
      course: courseTitle,
    });

    /* ================= ADMIN EMAIL ================= */
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Enrollment – ${courseTitle}`,
        html: `
          <h3>New Enrollment Received</h3>
          <p><b>Course:</b> ${courseTitle}</p>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Files:</b> ${
            Object.keys(uploadedFiles).length > 0
              ? Object.keys(uploadedFiles).join(", ")
              : "None"
          }</p>
        `,
      });
    } catch (err) {
      console.log("⚠️ Admin email failed:", err.message);
    }

    res.json(enrollment);

  } catch (err) {
    console.log("❌ CREATE ENROLLMENT ERROR:", err.message);
    res.status(500).json({
      message: "Failed to submit enrollment.",
    });
  }
}

/* ================= GET ALL ================= */
export async function getAllEnrollments(_req, res) {
  try {
    const list = await Enrollment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch {
    res.status(500).json({ message: "Failed to load enrollments." });
  }
}

/* ================= GROUP ================= */
export async function getGroupedEnrollments(_req, res) {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });

    const grouped = {};

    enrollments.forEach((e) => {
      const slug = e.courseSlug || "other";

      if (!grouped[slug]) {
        grouped[slug] = {
          courseTitle: e.courseName || "Other",
          enrollments: [],
        };
      }

      grouped[slug].enrollments.push(e);
    });

    res.json(grouped);
  } catch {
    res.status(500).json({ message: "Failed to group enrollments." });
  }
}

/* ================= STATUS ================= */
export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    const prevStatus = enrollment.status;

    enrollment.status = status;
    await enrollment.save();

    console.log("🔄 STATUS UPDATE:", { id, prevStatus, newStatus: status });

    const course = enrollment.course
      ? await Course.findById(enrollment.course)
      : null;

    if (status === "accepted" && prevStatus !== "accepted" && enrollment.email) {
      try {
        await sendEmail({
          to: enrollment.email,
          subject: `Enrollment Approved – ${enrollment.courseName}`,
          html: acceptedEmail({
            name: enrollment.name,
            courseName: enrollment.courseName,
            whatsappLink: course?.whatsappGroupLink || "",
          }),
        });
      } catch (err) {
        console.log("❌ ACCEPT email failed:", err.message);
      }
    }

    if (status === "rejected" && prevStatus !== "rejected" && enrollment.email) {
      try {
        await sendEmail({
          to: enrollment.email,
          subject: `Enrollment Update – ${enrollment.courseName}`,
          html: rejectedEmail({
            name: enrollment.name,
            courseName: enrollment.courseName,
          }),
        });
      } catch (err) {
        console.log("❌ REJECT email failed:", err.message);
      }
    }

    return res.json(enrollment);

  } catch (err) {
    console.log("❌ UPDATE STATUS ERROR:", err.message);
    return res.status(500).json({
      message: "Failed to update enrollment status.",
    });
  }
}

/* ================= DELETE ================= */
export async function deleteEnrollment(req, res) {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    if (enrollment.files) {
      for (const [key, file] of enrollment.files.entries()) {
        if (file?.public_id) {
          try {
            await cloudinary.uploader.destroy(file.public_id, {
              resource_type: "auto",
            });
            console.log("☁️ Deleted:", file.public_id);
          } catch (err) {
            console.log("⚠️ Cloudinary delete failed:", err.message);
          }
        }
      }
    }

    await enrollment.deleteOne();

    res.json({ success: true });

  } catch (err) {
    console.log("❌ DELETE ERROR:", err.message);
    res.status(500).json({ message: "Delete failed" });
  }
}