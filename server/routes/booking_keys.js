//Booking_key controller

const express = require('express');
const router = express.Router();

module.exports = function (app) {
    const ensureAuthenticated = require('../middlewares/ensureAuthenticated')(app);
    app.use('/api', router);


};

