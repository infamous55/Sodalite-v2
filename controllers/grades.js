const Grades = require('../models/Grades');
const ErrorResponse = require('../utils/errorResponse');

exports.addGrades = async (req, res, next) => {
  try {
    const catalogue = await Grades.findById(req.params.id);
    if (!catalogue) return next(new ErrorResponse('Grades do not exist', 400));

    const subjects = req.body.subjects;
    if (!Array.isArray(subjects))
      return next(new ErrorResponse('Subjects are required', 400));

    let name;
    let grades;
    try {
      subjects.forEach((element) => {
        name = element.name;
        grades = element.grades;
        if (!name || !grades) throw 'Name and grades are required';
        if (catalogue.subjects.some((e) => e.name === name)) {
          let index = catalogue.subjects.findIndex((e) => e.name === name);
          element.grades.forEach((e) => {
            if (
              catalogue.subjects[index].grades.some(
                (el) => el.thesis === true
              ) &&
              e.thesis === true
            )
              throw 'Cannot have more than one thesis';
            catalogue.subjects[index].grades.push(e);
          });
        } else {
          let data = {
            name,
            grades,
          };
          catalogue.subjects.push(data);
        }
      });
    } catch (error) {
      return next(new ErrorResponse(error, 400));
    }
    await catalogue.save();
    res.status(200).json({
      success: true,
      data: catalogue,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteGrades = async (req, res, next) => {
  try {
    const catalogue = await Grades.findById(req.params.id);
    if (!catalogue) return next(new ErrorResponse('Grades do not exist', 400));

    const subjects = req.body.subjects;
    if (!Array.isArray(subjects))
      return next(new ErrorResponse('Subjects are required', 400));

    let name;
    let grades;
    try {
      subjects.forEach((element) => {
        name = element.name;
        grades = element.grades;
        if (!name || !grades) throw 'Name and grades are required';
        if (!catalogue.subjects.some((e) => e.name === name))
          throw 'Grades do not exist';
        let index = catalogue.subjects.findIndex((e) => e.name === name);
        element.grades.forEach((e) => {
          let elementIndex = catalogue.subjects[index].grades.findIndex(
            (el) => e.grade === el.grade && e.thesis === el.thesis
          );
          if (elementIndex === -1) throw 'Grades do not exist';
          catalogue.subjects[index].grades.splice(elementIndex, 1);
        });
        if (
          !Array.isArray(catalogue.subjects[index].grades) ||
          !catalogue.subjects[index].grades.length
        )
          catalogue.subjects.splice(index, 1);
      });
    } catch (error) {
      return next(new ErrorResponse(error, 400));
    }
    await catalogue.save();
    res.status(200).json({
      success: true,
      data: catalogue,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrades = async (req, res, next) => {
  try {
    const grades = await Grades.findById(req.params.id);
    if (!grades) return next(new ErrorResponse('Grades do not exist', 400));
    res.json({
      success: true,
      data: grades,
    });
  } catch (error) {
    next(error);
  }
};
