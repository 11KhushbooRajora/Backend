const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true, 
  },
  username: {
    type: String,
    required: true, 
  },
  bio: {
    type: String,
    required: true, 
  },
  profilePicUrl: {
    type: String,
    required: true, 
  },
  followingCount: {
    type: Number,
    required: true, 
  },
  followerCount: {
    type: Number,
    required: true, 
  },
  companyName: {
    type: String,
    required: true, 
  },
  location: {
    type: String,
    required: true, 
  },
  portfolioUrl: {   // ✅ fixed colon
    type: String,
    required: true, 
  },
}, { timestamps: true }); // optional but useful

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
