const express = require('express');
const router = express.Router()
const postController = require('../controllers/postController')
const bcrypt = require('bcryptjs')
const passport = require('passport')

// get post
router.get('/post/:id/create', (req, res) => {
    res.render('post', {title: 'Create a post'})
})
//get comment a post
router.get('/post/:id/comment', (req, res) => {
  res.render('post-comment', {title: 'Post a comment'})
})
//get timeline posts
router.get("/post/timeline/all", postController.handleTimeline);
//create a post
router.post("/post/:id/create", postController.handelPost);
//comment a post
router.post('/post/:id/comment', postController.handleComment)
//update a post
router.put("/post/:id", postController.handleUpdatePost);
//delete a post
router.delete("/post/:id", postController.handleDeletePost);
//like / dislike a post 
router.put("/post/:id/like", postController.handelLikeAndDislike);

module.exports = router;