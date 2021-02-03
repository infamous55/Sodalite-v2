const Posts = require('../models/Posts');
const ErrorResponse = require('../utils/errorResponse');

exports.createPost = async (req, res, next) => {
  try {
    const post = await Posts.create({
      title: req.body.title,
      description: req.body.description,
      author: req.user._id,
      tags: req.body.tags,
    });

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post)
      res.status(200).json({
        success: true,
        data: post,
      });
    else throw new ErrorResponse('Post does not exist', 400);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw new ErrorResponse('Post does not exist', 400);
    if (req.user._id.toString() !== post.author.toString())
      throw new ErrorResponse('Permision denied', 403);

    if (req.body.title) post.title = req.body.title;
    if (req.body.description) post.description = req.body.description;
    if (req.body.tags) post.tags = req.body.tags;

    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw new ErrorResponse('Post does not exist', 400);
    if (
      req.user._id.toString() !== post.author.toString() &&
      req.user.role !== 'Admin'
    )
      throw new ErrorResponse('Permision denied', 403);

    await Posts.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
