const express = require('express');

const {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
} = require('../controllers/classes');

const router = express.Router();

const Class = require('../models/Class');

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', advancedResults(Class), getClasses);
router.post('/', authorize('Teacher', 'Admin'), createClass);
router.get('/:id', getClass);
router.put('/:id', authorize('Teacher', 'Admin'), updateClass);
router.delete('/:id', authorize('Teacher', 'Admin'), deleteClass);

module.exports = router;
