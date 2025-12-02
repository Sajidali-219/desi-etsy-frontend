require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");

connectDB();

async function createAdmin() {
  const exists = await User.findOne({ role: "admin" });

  if (exists) {
    console.log("Admin already exists");
    return process.exit();
  }

  await User.create({
    name: "Super Admin",
    email: "admin@desi.com",
    password: "Admin123",
    role: "admin",
  });

  console.log("Admin created successfully!");
  process.exit();
}

createAdmin();
