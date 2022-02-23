const express = require('express')
const router = express.Router()
const { ensuraAuthenticated } = require('../config/auth')
const middleware = require('../middleware')
// Welcome Page
router.get('/', (req, res) => res.render('welcome'))
// Dashboard
router.get('/dashboard', ensuraAuthenticated, (req, res) => 
    res.render('dashboard', {
        loggedIn: true,
        name: req.user.name,
        title: req.user.title
    })
)
router.get('/post', ensuraAuthenticated, (req, res) => 
    res.render('post', {
        loggedIn: true,
        name: req.user.name,
        title: req.user.title
    })
)
router.get('/create', ensuraAuthenticated, (req, res) => 
    res.render('create', {
        loggedIn: true,
        name: req.user.name,
        title: req.user.title
    })
)

module.exports = router