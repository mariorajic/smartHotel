//Get all users

const express = require('express');
const router = express.Router();

module.exports = function (app) {
    const ensureAuthenticated = require('../middlewares/ensureAuthenticated')(app);
    app.use('/api', router);
    router.get('/users', ensureAuthenticated, (req, res) => {
        //auth user
        db.user.findAll({
            attributes: ['username', 'email'],
            raw: true,
        }).then(function (users) {
            if (!users) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No users found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found users',
                    data: users
                });
            }
        });
    });
};
