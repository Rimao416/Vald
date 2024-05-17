const catchAsync = require("../../utils/catchAsync");
const Student = require("../../models/staff/Student");
exports.registerStudent = catchAsync(async (req, res, next) => {
  const createStudent = await Student.create(req.body);
  res.status(200).json({
    status: "success",
    createStudent,
  });
});

exports.getStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find();
  res.status(200).json({
    status: "success",
    data: students,
  });
});
exports.getSingleStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: student,
  });
});
exports.updateStudent = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: student,
  });
});
