const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const authController = require('../controllers/authController')
const middleware = require("../middleware");

// User model
const User = require('../models/User')

// Login Page
router.get('/login', (req, res) => {
    res.render('login')
})

// Register Page
router.get('/register', (req, res) => {
    res.render('register')
})

// Register Handle
router.post('/register', authController.handleRegister)

// Login Handle
router.post('/login', authController.handleLogin);

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

  

module.exports = router