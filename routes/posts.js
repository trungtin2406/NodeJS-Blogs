const express = require('express');
const router = express.Router()
const Post = require("../models/Post")
const User = require("../models/User")
const postController = require('../controllers/postController')
const bcrypt = require('bcryptjs')
const passport = require('passport')

// get post
router.get('/post', (req, res) => {
    res.render('post', {title: 'Create a post'})
})

//create a post
router.post("/post", postController.handelPost);

//get comment a post
router.get('/post/:id/comment', (req, res) => {
    res.render('post-comment', {title: 'Post a comment'})
})

//comment a post
router.post('/post/:id/comment', postController.handleComment)

//update a post
router.put("/post/:id", postController.handleUpdatePost);

//delete a post
  
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});
//like / dislike a post
  
router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

  
//get timeline posts
  
router.get("/timeline/all", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
});
  
module.exports = router;