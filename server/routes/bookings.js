//Bookings controller

const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const Op = db.sequelize.Op;

module.exports = function (app) {
  const ensureAuthenticated = require("../middlewares/ensureAuthenticated")(
    app
  );
  app.use("/api", router);

  //Create a new booking
  router.post("/bookings/create", (req, res) => {
    // check if any keys are sent
    // if (req.body.params.booking_keys.length < 1) return res.json({
    //     success: false,
    //     data: {
    //         msg: 'No keys sent'
    //     }
    // });
    db.booking
      .create({
        firstname: req.body.params.booking.firstname,
        lastname: req.body.params.booking.lastname,
        date_from: req.body.params.booking.range.start,
        date_to: req.body.params.booking.range.end,
        room_id: req.body.params.room_id,
      })
      .then((result) => {
        if (req.body.params.booking_keys.length === 0) {
          res.json({
            success: true,
            data: {
              msg: "Booking created successfully",
            },
          });
        }

        req.body.params.booking_keys.forEach(function (key, i) {
          db.sequelize
            .query(
              "select * from insert_key_into_booking_keys(:keyCode, :bookingID)",
              {
                replacements: {
                  keyCode: key.code,
                  bookingID: result.id,
                },
                type: sequelize.QueryTypes.INSERT,
              }
            )
            .then((result) => {
              if (i === req.body.params.booking_keys.length - 1) {
                res.json({
                  success: true,
                  data: {
                    msg: "Booking created successfully",
                  },
                });
              }
            })
            .catch((err) => {
              res.json({
                success: false,
                data: err,
              });
            });
        });
      });
  });

  //Find current booking for a room

  router.get("/bookings/getByRoomId", ensureAuthenticated, (req, res) => {
    db.sequelize
      .query("select * from get_bookings_by_room_id(:roomID)", {
        replacements: {
          roomID: req.query.id,
        },
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function (bookings) {
        if (!bookings) {
          res.json({
            success: false,
            data: {
              msg: "No bookings found for this room",
            },
          });
        } else {
          res.json({
            success: true,
            msg: "Successfully found bookings for this room",
            data: bookings[0],
          });
        }
      });
  });

  //Find all bookings for a room

  router.get("/bookings/getDatesByRoomId", ensureAuthenticated, (req, res) => {
    db.booking
      .findAll({
        where: {
          room_id: req.query.id,
        },
        raw: true,
      })
      .then(function (bookings) {
        if (!bookings) {
          res.json({
            success: false,
            data: {
              msg: "No bookings found for this room",
            },
          });
        } else {
          res.json({
            success: true,
            msg: "Successfully found bookings for this room",
            data: bookings,
          });
        }
      });
  });

  //Additional key for current booking

  router.post("/bookings/additionalKey", (req, res) => {
    req.body.params.booking_keys.forEach(function (key, i) {
      db.sequelize
        .query(
          "select * from insert_key_into_booking_keys(:keyCode, :bookingID)",
          {
            replacements: {
              keyCode: key.code,
              bookingID: req.body.params.id,
            },
            type: sequelize.QueryTypes.INSERT,
          }
        )
        .then((result) => {
          if (i === req.body.params.booking_keys.length - 1) {
            res.json({
              success: true,
              data: {
                booking: result,
                msg: "Booking keys added successfully",
              },
            });
          }
        })
        .catch((err) => {
          res.json({
            success: false,
            data: err,
          });
        });
    });
  });
};
