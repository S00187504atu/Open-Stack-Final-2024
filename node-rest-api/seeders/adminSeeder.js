const bcrypt = require("bcrypt");
const User = require("../models/authModel.js"); // Assuming you have a User model defined

const adminSeeder = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "superadmin@kian.com" });
    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("secret123", 10); // Hash the password
      const adminUser = new User({
        email: "superadmin@kian.com",
        password: hashedPassword,
        isAdmin: true
      });
      await adminUser.save(); // Save admin user to database
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

module.exports = adminSeeder;
