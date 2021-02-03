const express = require('express');

const { getGrades, addGrades, deleteGrades } = require('../controllers/grades');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('Teacher', 'Admin'));

router.put('/:id/grades', addGrades);
router.delete('/:id/grades', deleteGrades);
router.get('/:id/grades', getGrades);

module.exports = router;
