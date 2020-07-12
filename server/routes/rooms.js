//Rooms controller

const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

module.exports = function (app) {
    const ensureAuthenticated = require('../middlewares/ensureAuthenticated')(app);
    app.use('/api', router);

    //Find all rooms

    router.get('/rooms', ensureAuthenticated, (req, res) => {
        db.sequelize.query('select * from get_all_rooms(:floorID)',{
            replacements: {
                floorID: req.query.floor_id },
            type: sequelize.QueryTypes.SELECT})
            .then(function (rooms) {
            if (!rooms) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No rooms found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found rooms',
                    data: rooms
                });
            }
        });
    });

    //Find specific room with bookings

    router.get('/rooms/getById', ensureAuthenticated, (req, res) => {
        db.sequelize.query('select *, (select b.date_from from bookings b\n' +
            'where NOW() between b.date_from and b.date_to\n' +
            'and b.room_id = id limit 1) as occupied_from,\n' +
            '(select b.date_to from bookings b\n' +
            'where NOW() between b.date_from and b.date_to\n' +
            'and b.room_id = id limit 1) as occupied_to\n' +
            'from rooms where id=:roomID',{
            replacements: {
                roomID: req.query.id },
            type: sequelize.QueryTypes.SELECT})
            .then(function (rooms) {
            if (!rooms) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No room found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found a room',
                    data: rooms[0]
                });
            }
        });
    });

    //Create new rooms

    router.post('/rooms/create', (req, res) => {
        db.room.create({
            name: req.body.name,
            number: req.body.number,
            capacity: req.body.capacity,
            floor_id: req.body.floor_id
        }).then((result) => {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        room: result,
                        msg: 'Room created successfully'
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

    //Edit existing room

    router.post('/rooms/editById', (req, res) => {
        db.room.update({
            name: req.body.name,
            number: req.body.number,
            capacity: req.body.capacity,
            floor_id: req.body.floor_id
        }, {
            where: {id: req.body.id},
            returning: true,
            plain: true
        }).then(function (result) {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        room: result,
                        msg: 'Room edited successfully'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'Could not edit the selected room'
                    }
                });
            }
        });
    });

    //Delete existing room

    router.post('/rooms/deleteById', (req, res) => {
        db.room.update({
            is_deleted: true,
        }, {
            where: {
                id: req.body.id
            },
            returning: true,
            plain: true
        }).then(function (result) {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        room: result,
                        msg: 'Room deleted successfully'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'Could not delete the selected room'
                    }
                });
            }
        });
    });

    //Edit Key Status

    router.post('/rooms/keyStatus', (req, res) => {
            db.room.update({
                key_status: !req.body.key_status
            }, {
                where: {id: req.body.id},
                returning: true,
                plain: true
            }).then(function (result) {
                if (result) {
                    res.json({
                        success: true,
                        data: {
                            room: result,
                            msg: 'Changed key status'
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        data: {
                            msg: 'Could not change the key status'
                        }
                    });
                }
            });
    });

    //Edit Door Status

    router.post('/rooms/doorStatus', (req, res) => {
        db.room.update({
            door_status: !req.body.door_status
        }, {
            where: {id: req.body.id},
            returning: true,
            plain: true
        }).then(function (result) {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        room: result,
                        msg: 'Changed door status'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'Could not change the door status'
                    }
                });
            }
        });
    });

    //Edit Window Status

    router.post('/rooms/windowStatus', (req, res) => {
        db.room.update({
            window_status: !req.body.window_status
        }, {
            where: {id: req.body.id},
            returning: true,
            plain: true
        }).then(function (result) {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        room: result,
                        msg: 'Changed window status'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'Could not change the window status'
                    }
                });
            }
        });
    });

    //Activate SOS

    router.post('/rooms/sos', (req, res) => {
        db.room.update({
            sos_status: !req.body.sos_status
        }, {
            where: {id: req.body.id},
            returning: true,
            plain: true
        }).then(function (result) {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        room: result,
                        msg: 'Changed SOS status'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'Could not change the SOS status'
                    }
                });
            }
        });
    });
};

