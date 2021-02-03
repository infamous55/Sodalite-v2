const express = require('express');

const {
  addSubjects,
  deleteSubjects,
  getSubjects,
} = require('../controllers/subjects');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('Teacher', 'Admin'));

router.get('/', getSubjects);
router.put('/', addSubjects);
router.delete('/', deleteSubjects);

module.exports = router;
