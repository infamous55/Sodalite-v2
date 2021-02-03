const User = require('../models/User');
const Class = require('../models/Class');
const { findById } = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const Grades = require('../models/Grades');

exports.addStudent = async (req, res, next) => {
  try {
    const student = await User.findById(req.body.student);
    if (!student) return next(new ErrorResponse('Student does not exist', 400));

    if (student.role !== 'Student')
      return next(new ErrorResponse('User is not a student', 400));

    const group = await Class.findById(req.params.id);
    if (!group) return next(new ErrorResponse('Class does not exist'), 400);

    if (
      group.students.some(
        (e) => e.student.toString() === student._id.toString()
      )
    )
      return next(new ErrorResponse('Student is already in class', 400));

    const grades = {
      subjects: [],
    };
    const savedGrades = await Grades.create(grades);

    const data = {
      student: student._id,
      catalogue: savedGrades._id,
    };
    group.students.push(data);

    await group.save();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeStudent = async (req, res, next) => {
  try {
    const student = await User.findById(req.body.student);
    if (!student) return next(new ErrorResponse('Student does not exist', 400));

    const group = await Class.findById(req.params.id);
    if (!group) return next(new ErrorResponse('Class does not exist'), 400);

    if (
      !group.students.some(
        (e) => e.student.toString() === student._id.toString()
      )
    )
      return next(new ErrorResponse('Student is not in class', 400));
    await Grades.findByIdAndDelete(group.students[0].catalogue);
    const index = group.students.findIndex(
      (object) => object.student === student._id
    );
    group.students.splice(index, 1);

    const savedGroup = await group.save();
    res.status(200).json({
      success: true,
      data: savedGroup,
    });
  } catch (error) {
    next(error);
  }
};
