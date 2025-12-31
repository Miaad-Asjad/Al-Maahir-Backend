export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      token,
    });
  } catch {
    res.status(500).json({ message: "Unable to login at the moment." });
  }
 }


// export async function createAdminIfNotExists() {
//   try {
//     const email = process.env.ADMIN_EMAIL;
//     const password = process.env.ADMIN_PASSWORD;
//     if (!email || !password) return;

//     const exists = await User.findOne({ email });
//     if (exists) return;

//     const hash = await bcrypt.hash(password, 10);
//     const admin = new User({
//       name: "Admin",
//       email,
//       passwordHash: hash,
//       role: "admin",
//     });

//     await admin.save();
//   } catch {
//     // intentionally silent (production safe)
//   }
// }


export async function createAdminIfNotExists() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error("❌ ADMIN_EMAIL or ADMIN_PASSWORD missing");
      return;
    }

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("✅ Admin already exists");
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    const admin = new User({
      name: "Admin",
      email,
      passwordHash: hash,
      role: "admin",
    });

    await admin.save();
    console.log("🔥 Admin user CREATED successfully");
  } catch (err) {
    console.error("❌ createAdminIfNotExists error:", err);
  }
}
