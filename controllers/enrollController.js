import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import sendEmail from "../utils/sendEmail.js";
import { acceptedEmail, rejectedEmail } from "../utils/emailTemplates.js";
import { io } from "../server.js";

export async function createEnrollment(req, res) {
  try {
    const { course, name, email, phone, courseName, customFields } = req.body;

    let courseId = course || null;
    let courseTitle = courseName || "";
    let courseSlug = "";

    // ✅ Fetch course info if courseId is provided
    if (courseId) {
      const c = await Course.findById(courseId);
      if (c) {
        courseTitle = c.title;
        courseSlug = c.slug;
      }
    }

    // ✅ Parse custom fields
    let parsedCustom = {};
    try {
      parsedCustom =
        typeof customFields === "string"
          ? JSON.parse(customFields)
          : customFields || {};
    } catch {
      parsedCustom = {};
    }

    // ✅ MULTIPLE FILES FIX
    const uploadedFiles = {}; // { fieldname: filename }

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        uploadedFiles[file.fieldname] = file.filename;
      });
    }

    // ✅ Create enrollment with multiple files
    const enrollment = new Enrollment({
      course: courseId,
      courseName: courseTitle,
      courseSlug,
      name,
      email,
      phone,
      customFields: parsedCustom,
      files: uploadedFiles, // 🔥 store all files
    });

    await enrollment.save();

    console.log("✅ SAVED FILES:", uploadedFiles);

    // ✅ Real-time notification
    io.emit("new-enrollment", {
      student: name,
      course: courseTitle,
    });

    // ✅ Admin email
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
          <p><b>Files:</b> ${Object.keys(uploadedFiles).join(", ") || "None"}</p>
        `,
      });
    } catch (err) {
      console.log("Admin email failed:", err.message);
    }

    res.json(enrollment);
  } catch (err) {
    console.log("CREATE ENROLLMENT ERROR:", err.message);
    res.status(500).json({
      message: "Failed to submit enrollment. Please try again.",
    });
  }
}




export async function getAllEnrollments(_req, res) {
  try {
    const list = await Enrollment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch {
    res.status(500).json({ message: "Failed to load enrollments." });
  }
}



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


export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    const prevStatus = enrollment.status;

    // ✅ update status
    enrollment.status = status;
    await enrollment.save();

    console.log("🔄 STATUS UPDATE:", {
      id,
      prevStatus,
      newStatus: status,
      email: enrollment.email,
    });

    // ✅ get course (optional)
    const course = enrollment.course
      ? await Course.findById(enrollment.course)
      : null;

    /* ============================================================
       ✅ ACCEPTED EMAIL
    ============================================================ */
    if (
      status === "accepted" &&
      prevStatus !== "accepted" &&
      enrollment.email
    ) {
      try {
        console.log("📤 Sending ACCEPT email to:", enrollment.email);

        await sendEmail({
          to: enrollment.email,
          subject: `Enrollment Approved – ${enrollment.courseName}`,
          html: acceptedEmail({
            name: enrollment.name,
            courseName: enrollment.courseName,
            whatsappLink: course?.whatsappGroupLink || "",
          }),
        });

        enrollment.emailSent = true;
        await enrollment.save();

        console.log("✅ ACCEPT email sent");
      } catch (err) {
        console.log("❌ ACCEPT email failed:", err.message);
      }
    }

    /* ============================================================
       ❌ REJECTED EMAIL
    ============================================================ */
    if (
      status === "rejected" &&
      prevStatus !== "rejected" &&
      enrollment.email
    ) {
      try {
        console.log("📤 Sending REJECT email to:", enrollment.email);

        await sendEmail({
          to: enrollment.email,
          subject: `Enrollment Update – ${enrollment.courseName}`,
          html: rejectedEmail({
            name: enrollment.name,
            courseName: enrollment.courseName,
          }),
        });

        console.log("✅ REJECT email sent");
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