const express = require('express')
const router = express.Router()
const { ensuraAuthenticated } = require('../config/auth')
// Welcome Page
router.get('/', (req, res) => res.render('welcome'))
// Dashboard
router.get('/dashboard', ensuraAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    })
)
router.get('/post', ensuraAuthenticated, (req, res) => 
    res.render('post', {
        name: req.user.name
    })
)
router.get('/create', ensuraAuthenticated, (req, res) => 
    res.render('create', {
        name: req.user.name
    })
)
module.exports = router