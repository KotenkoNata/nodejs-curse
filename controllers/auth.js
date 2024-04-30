const User = require('../models/user');

exports.getLogin = (req, res, next) => {
            res.render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                isAuthenticated: false,
            })
}

exports.postLogin = (req, res, next) => {
    User.findById('6627ad4d4099f4150ded3543')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect(`/`);
        })
        .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/')
    })
}