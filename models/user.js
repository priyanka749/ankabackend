// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   fullName: String,
//   email: { type: String, unique: true },
//   phone: String,
//   address: String,
//   password: String,
//   otp: String,
//   isVerified: { type: Boolean, default: false },
//   image: String,
//   favorites: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',  // Reference to Product model
//   }],
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user"
//   }
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
  },
    phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
  },
  address: String,
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"]
  },
  otp: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  image: String,
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);
