const express = require('express');

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/posts');

const router = express.Router();

const Posts = require('../models/Posts');

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', advancedResults(Posts), getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
