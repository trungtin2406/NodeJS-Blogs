const User = require('../models/User')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const handleLogin = (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
}

const handleRegister = (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    // check require fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Vui lòng điền đầy đủ thông tin' })
    }

    // check password match
    if (password !== password2) {
        errors.push({ msg: 'Mật khẩu không chính xác' })
    }

    // check password length
    if (password.length < 6) {
        errors.push({ msg: 'Độ dài mật khẩu tối thiểu 6 kí tự' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation passed
        User.findOne({ email: email })
            .then(async user => {
                if (user) {
                    //User exists
                    errors.push({ msg: 'Email đã tồn tại!' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    })
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                // set password to hashed
                                newUser.password = hash
                                    // Save user
                                newUser.save()
                                    .then(user => {
                                        //req.flash('success_msg', 'Đăng ký thành công và có thể đăng nhập')
                                        errors.push({ msg: 'Email đã tồn tại!', type:"success" })
                                        res.redirect('/users/login')
                                    })
                                    .catch(err => console.log(err))
                            })
                        })
                        // await newUser.save().then(data => {
                        //     console.log(data)
                        // });
                        // console.log(newUser);
                        // res.send('heello')
                }
            })
    }
}
 

module.exports = {
    handleRegister,
    handleLogin
}