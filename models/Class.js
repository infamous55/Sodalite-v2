const mongoose = require('mongoose');
const User = require('./User');
const Grades = require('./Grades');
const ErrorResponse = require('../utils/errorResponse');

const ClassSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true,
    min: 5,
    max: 12,
    validate: {
      validator: Number.isInteger,
      messsage: '{VALUE} is not an integer value',
    },
  },
  letter: {
    type: String,
    required: true,
    match: [/^[A-Z]$/, 'Letter is invalid'],
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  specialization: {
    type: String,
    enum: ['Matematica-Informatica', 'Stiinte ale Naturii'],
  },
  students: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      catalogue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grades',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Class', ClassSchema);
