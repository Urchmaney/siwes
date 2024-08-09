const Student = require('../models/student');

const createStudent = async (student) => {
  try {
    student = new Student(student);
    const error = student.validateSync();
    if (error) {
      return {
        status: false,
        result: Object.keys(error.errors).map(ele => error.errors[ele].message),
      };
    }

    await student.save();
    return { status: true, result: student };
  } catch (e) {
    return { status: false, result: [e.message] };
  }
};

module.exports = {
  createStudent,
};
