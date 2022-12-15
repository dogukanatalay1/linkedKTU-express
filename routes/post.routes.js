const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router
  .route('/create')
  .post(postController.createPost);

module.exports = router;
