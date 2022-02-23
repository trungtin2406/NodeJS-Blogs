const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');
const bodyparser = require('body-parser');
const postRoute = require("./routes/posts");

const app = express()
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'))
app.use(bodyparser.json());

// Passport config
require('./config/passport')(passport)
// DB Config
const db = require('./config/keys').MongoURI
// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
// EJS
app.use(expressLayouts)
app.use(express.static("public"));
app.set('view engine', 'ejs')
// Bodyparser
app.use(express.urlencoded({ extended: false }))
// Express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
// Connect flash
app.use(flash())
// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})
// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/api', require('./routes/posts'))
// app.use("/api/posts", postRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))