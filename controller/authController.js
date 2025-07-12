const User = require('../models/user'); // Make sure the path is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const admin = await User.findOne({ email: email.trim().toLowerCase() });

    // Check if user exists and is admin
    if (!admin || admin.role !== 'admin') {
      return res.status(401).json({ message: "Unauthorized. Not an admin." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Sign JWT
    const token = jwt.sign(
      { userId: admin._id, role: 'admin' },
      process.env.JWT_SECRET || "supersecret", // fallback for demo
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: { email: admin.email, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};