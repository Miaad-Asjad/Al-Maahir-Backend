import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import sendEmail from "../utils/sendEmail.js";
import {
  acceptedEmail,
  rejectedEmail,
} from "../utils/emailTemplates.js";
import { io } from "../server.js";



// export async function createEnrollment(req, res) {
//   try {
//     const {
//       course,
//       name,
//       email,
//       phone,
//       courseName,
//       customFields,
//     } = req.body;

//     let courseId = course || null;
//     let courseTitle = courseName || "";
//     let courseSlug = "";

//     // ✅ Course fetch
//     if (courseId) {
//       const c = await Course.findById(courseId);
//       if (c) {
//         courseTitle = c.title;
//         courseSlug = c.slug;
//       }
//     }

//     // ✅ Custom fields parse
//     let parsedCustom = {};
//     try {
//       parsedCustom =
//         typeof customFields === "string"
//           ? JSON.parse(customFields)
//           : customFields || {};
//     } catch {
//       parsedCustom = {};
//     }

//     // ✅ MULTIPLE FILES (🔥 MAIN FIX)
//     const uploadedFiles = {};

// if (req.files) {
//   req.files.forEach((file) => {
//     uploadedFiles[file.fieldname] = file.filename;
//   });
// }



//     // ✅ Create enrollment
//     const enrollment = new Enrollment({
//       course: courseId,
//       courseName: courseTitle,
//       courseSlug,
//       name,
//       email,
//       phone,
//       customFields: parsedCustom,

//       // 🔥 IMPORTANT
//       files: uploadedFiles,
//     });

//     await enrollment.save();

//     // ✅ Real-time notify
//     io.emit("new-enrollment", {
//       student: name,
//       course: courseTitle,
//     });

//     // ✅ Admin email
//     try {
//       await sendEmail({
//         to: process.env.ADMIN_EMAIL,
//         subject: `New Enrollment – ${courseTitle}`,
//         html: `
//           <h3>New Enrollment Received</h3>
//           <p><b>Course:</b> ${courseTitle}</p>
//           <p><b>Name:</b> ${name}</p>
//           <p><b>Email:</b> ${email}</p>
//           <p><b>Phone:</b> ${phone}</p>
//         `,
//       });
//     } catch (err) {
//       console.log("Admin email failed:", err.message);
//     }

//     res.json(enrollment);
//   } catch (err) {
//     console.log("CREATE ENROLLMENT ERROR:", err.message);
//     res.status(500).json({
//       message: "Failed to submit enrollment. Please try again.",
//     });
//   }
// }




export async function createEnrollment(req, res) {
  try {
    const { course, name, email, phone, courseName, customFields } = req.body;

    let courseId = course || null;
    let courseTitle = courseName || "";
    let courseSlug = "";

    if (courseId) {
      const c = await Course.findById(courseId);
      if (c) {
        courseTitle = c.title;
        courseSlug = c.slug;
      }
    }

    let parsedCustom = {};
    try {
      parsedCustom =
        typeof customFields === "string"
          ? JSON.parse(customFields)
          : customFields || {};
    } catch {
      parsedCustom = {};
    }

    // ✅ SINGLE FILE FIX
    const uploadedFile = req.file ? req.file.filename : null;

    const enrollment = new Enrollment({
      course: courseId,
      courseName: courseTitle,
      courseSlug,
      name,
      email,
      phone,
      customFields: parsedCustom,

      file: uploadedFile, // 🔥 IMPORTANT
    });

    await enrollment.save();

    console.log("✅ SAVED FILE:", uploadedFile);

    res.json(enrollment);
  } catch (err) {
    console.log("CREATE ENROLLMENT ERROR:", err.message);
    res.status(500).json({
      message: "Failed to submit enrollment.",
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
    enrollment.status = status;
    await enrollment.save();

    const course = enrollment.course
      ? await Course.findById(enrollment.course)
      : null;

   
    if (
      status === "accepted" &&
      prevStatus !== "accepted" &&
      !enrollment.emailSent &&
      enrollment.email
    ) {
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
    }

    
    if (
      status === "rejected" &&
      prevStatus !== "rejected" &&
      enrollment.email
    ) {
      await sendEmail({
        to: enrollment.email,
        subject: `Enrollment Update – ${enrollment.courseName}`,
        html: rejectedEmail({
          name: enrollment.name,
          courseName: enrollment.courseName,
        }),
      });
    }

    res.json(enrollment);
  } catch {
    res.status(500).json({
      message: "Failed to update enrollment status.",
    });
  }
}



