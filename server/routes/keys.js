//Booking_key controller

const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

module.exports = function (app) {
    const ensureAuthenticated = require('../middlewares/ensureAuthenticated')(app);
    app.use('/api', router);

    //get all keys

    router.get('/keys', ensureAuthenticated, (req, res) => {
        db.key.findAll({
            where: {
                is_deleted: false
            },
            raw: true,
        }).then(function (keys) {
            if (!keys) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No keys found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found keys',
                    data: keys
                });
            }
        });
    });

    router.get('/keyCheck', ensureAuthenticated, (req, res) => {
        db.sequelize.query('select * from check_active_keys(:keyCode)',
            {
                replacements: {
                    keyCode: req.query.code
                },
                type: sequelize.QueryTypes.SELECT})
            .then((result) => {
                if (result[0].check_active_keys === 'ok') {
                    res.json({
                        success: true,
                        data: {
                            msg: 'Successfully added the key'
                        }
                    });
                }else{
                    res.json({
                        success: false,
                        data: {
                            msg: result[0].check_active_keys
                        }
                    });
                }
            }).catch((err) => {
            res.json({
                success: false,
                data: err
            });
        })
    });

    //get all keys

    router.get('/keys/getByRoomId', ensureAuthenticated, (req, res) => {
        db.sequelize.query(
            'select k.id, k.code, b.date_from, b.date_to, b.room_id from booking_keys bk\n' +
            'inner join keys k on bk.key_id = k.id\n' +
            'inner join bookings b on bk.booking_id = b.id\n' +
            'where NOW() >= b.date_from\n' +
            'and NOW() <= b.date_to\n' +
            'and b.room_id = :roomID',
            {
                replacements: {
                    roomID: req.query.room_id
                },
                type: sequelize.QueryTypes.SELECT})
            .then(function (keys) {
            if (!keys) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No keys found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found keys',
                    data: keys
                });
            }
        });
    });

};

