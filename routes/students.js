const express = require('express');

const { addStudent, removeStudent } = require('../controllers/students');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('Teacher', 'Admin'));

router.put('/:id/students', addStudent);
router.delete('/:id/students', removeStudent);

module.exports = router;
