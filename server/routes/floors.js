//Floors controller

const express = require('express');
const router = express.Router();

module.exports = function (app) {
    const ensureAuthenticated = require('../middlewares/ensureAuthenticated')(app);
    app.use('/api', router);

    //Find all floors

    router.get('/floors', ensureAuthenticated, (req, res) => {
        db.floor.findAll({
            where: {
                is_deleted: false,
            },
            raw: true,
        }).then(function (floors) {
            if (!floors) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No floors found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found floors',
                    data: floors
                });
            }
        });
    });

    //Find specific floor

    router.get('/floors/getById', ensureAuthenticated, (req, res) => {
        db.floor.findOne({
            where: {
              id: req.query.id
            },
            raw: true,
        }).then(function (floors) {
            if (!floors) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No floors found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found floors',
                    data: floors
                });
            }
        });
    });

    //Create new floors

    router.post('/floors/create', (req, res) => {
        db.floor.create({
            number: req.body.number,
        }).then((result) => {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        floor: result,
                        msg: 'Floor created successfully'
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

    //Edit existing floor

    router.post('/floors/editById', (req, res) => {
        db.floor.update({
            number: req.body.number,
        }, {
            where: { id: req.body.id },
            returning: true,
            plain: true
        }).then(function (result) {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        room: result,
                        msg: 'Floor edited successfully'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'Could not edit the selected floor'
                    }
                });
            }
        });
    });

    //Delete existing floor

    router.post('/floors/deleteById', (req, res) => {
        db.floor.update({
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
                        msg: 'Floor deleted successfully'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'Could not delete the selected floor'
                    }
                });
            }
        });
    });
};

