const Post = require('../models/Post')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const handelPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text
    });
    post.save(function(err) {
        if(err) {console.log(err)}
            res.redirect('/')
    })
}

const handleComment = async (req, res) => {
    const comment = new Comment({text: req.body.text});
    const post = await Post.findById(req.params.id);
    const savedPost = post.comments.push(comment);

    savedPost.save(function(err, results){
       if(err) {console.log(err)}
       res.render('post_details', {title: 'Post details', comments: 
        results.comments})
    })
}

const handleUpdatePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}

const handleDeletePost = async (req, res) => {
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
}

const handelLikeAndDislike = async (req, res) => {
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
}

const handleTimeline = async (req, res) => {
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
}

module.exports = {
    handelPost, handleComment, handleUpdatePost, handleDeletePost, handelLikeAndDislike, handleTimeline
}