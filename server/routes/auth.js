const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
    app.use('/api', router);
    router.post('/login', (req, res) => {
        //auth user
        db.user.findOne({
            raw: true,
            where: {
                username: req.body.username
            }
        }).then(function (user) {
            if (!user) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No such user found'
                    }
                });
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result === true) {
                        delete user.password;
                        const token = jwt.sign({user}, app.get('jwtSecretKey'));
                        res.json({
                            success: true,
                            msg: 'Succesfully login',
                            data: user,
                            token
                        });
                    } else {
                        res.json({
                            success: false,
                            msg: 'Wrong password'
                        });
                    }
                });
            }
        });
    });

    router.post('/register', (req, res) => {
        db.user.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }).then((result) => {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        user: result,
                        msg: 'User registered successfully'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'Something went wrong'
                    }
                });
            }
        })
    });
};