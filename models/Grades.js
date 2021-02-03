const mongoose = require('mongoose');
const Subjects = require('../models/Subjects');
const ErrorResponse = require('../utils/errorResponse');

const GradesSchema = mongoose.Schema({
  subjects: {
    type: [
      {
        name: {
          type: String,
          trim: true,
        },
        grades: {
          type: [
            {
              grade: {
                type: Number,
                min: 1,
                max: 10,
                validate: {
                  validator: Number.isInteger,
                  messsage: '{VALUE} is not an integer value',
                },
              },
              thesis: {
                type: Boolean,
                default: false,
              },
            },
          ],
        },
      },
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

GradesSchema.pre('save', async function (next) {
  const subjects = await Subjects.findOne();
  this.subjects.forEach((element) => {
    if (subjects.subjects.indexOf(element.name) === -1)
      return next(new ErrorResponse('Subjects do not exist', 400));
  });
  next();
});

module.exports = mongoose.model('Grades', GradesSchema);
