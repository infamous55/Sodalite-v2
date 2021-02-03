const Class = require('../models/Class');
const ErrorResponse = require('../utils/errorResponse');

exports.createClass = async (req, res, next) => {
  try {
    const group = await Class.create({
      number: req.body.number,
      letter: req.body.letter,
      teacher: req.body.teacher,
      specialization: req.body.specialization,
      students: [],
    });

    res.status(200).json({
      success: true,
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

exports.getClasses = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

exports.getClass = async (req, res, next) => {
  try {
    const group = await Class.findById(req.params.id);

    if (group)
      res.status(200).json({
        success: true,
        data: group,
      });
    else throw new ErrorResponse('Class does not exist', 400);
  } catch (error) {
    next(error);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const updateData = {};
    if (req.body.number) updateData.number = req.body.number;
    if (req.body.letter) updateData.letter = req.body.letter;
    if (req.body.teacher) updateData.teacher = req.body.teacher;
    if (req.body.specialization)
      updateData.specialization = req.body.specialization;

    const group = await Class.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    await Class.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
