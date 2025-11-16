import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
import connectDB from "./config/db.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const username = "admin";
    const password = "admin123";
    const email = "admin@astroapp.com";

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Remove any previous admin with same username or email
    await Admin.deleteMany({});

    // Create a fresh admin
    const admin = await Admin.create({
      username,
      email,
      passwordHash,
    });

    console.log("✅ Admin created successfully!");
    console.log("📋 Login details:");
    console.log("   Username:", username);
    console.log("   Password:", password);
    console.log("   Email:", email);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
