var { Router } = require('express');
// passport config
var User = require('./models/user.model');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// Bring in defined Passport Strategy
require('./config/passport')(passport);

export function authApi() {
    let router = Router();

    router.route('/test')
        .post((req, res) => {
            if (!req.body.username || !req.body.password) {
                res.json({ success: false, message: 'Please enter email and password.' });
            } else {
                var newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                });

                // Attempt to save the user
                newUser.save(function (err) {
                    if (err) {
                        return res.json({ success: false, message: 'That email address already exists.' });
                    }
                    res.json({ success: true, message: 'Successfully created new user.' });
                });
            }
        })

    return router;
}