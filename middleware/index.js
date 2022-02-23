const Post = require('../models/Post')
const Comment = require('../models/Comment')

const middlewareObj = {}

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj