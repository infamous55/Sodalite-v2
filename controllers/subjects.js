const Subjects = require('../models/Subjects');
const ErrorResponse = require('../utils/errorResponse');

exports.addSubjects = async (req, res, next) => {
  try {
    const subjectsEntry = await Subjects.findOne();
    if (!subjectsEntry) {
      const data = await Subjects.create(req.body);
      return res.status(200).json({ success: true, data });
    } else {
      req.body.subjects.forEach((element) => {
        if (!subjectsEntry.subjects.some((e) => e === element))
          subjectsEntry.subjects.push(element);
      });
      await subjectsEntry.save();
      res.status(200).json({ success: true, data: subjectsEntry });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteSubjects = async (req, res, next) => {
  try {
    const subjectsEntry = await Subjects.findOne();
    if (!subjectsEntry) throw new ErrorResponse('No subjects in database', 503);
    if (!req.body.subjects)
      throw new ErrorResponse('Subjects are required', 400);
    else {
      req.body.subjects.forEach((element) => {
        if (!subjectsEntry.subjects.some((e) => e === element))
          throw new ErrorResponse('Subjects do not exist', 400);
        else {
          const index = subjectsEntry.subjects.indexOf(element);
          subjectsEntry.subjects.splice(index, 1);
        }
      });
    }
    const data = await subjectsEntry.save();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subjects.findOne();
    res.status(200).json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};
