const mongoose = require('mongoose');

const SubjectsSchema = new mongoose.Schema(
  {
    subjects: [
      {
        type: String,
      },
    ],
  },
  { capped: true, size: 1024, max: 1 }
);

module.exports = mongoose.model('Subjects', SubjectsSchema);
