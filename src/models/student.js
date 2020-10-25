const { Schema, model } = require('mongoose');

const Student = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  university: { type: String, required: true },
  department: { type: String, required: true },
  level: { type: String },
  matricNo: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

module.exports = model('students', Student);
