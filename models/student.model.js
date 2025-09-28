const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentRegistrationNumber: String,
    studentid: String,
    studentname: String,
fatherGaurdianName: String,
studentClass: String,
emergenceCall: Number,
studentProfileImageUrl: String,


})

const Student = mongoose.model("Student", studentSchema);
module.exports=Student;