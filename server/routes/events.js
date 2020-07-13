//Events controller

const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const e = require("express");

module.exports = function (app) {
  const ensureAuthenticated = require("../middlewares/ensureAuthenticated")(
    app
  );
  app.use("/api", router);

  // Find all SOS events

  router.get("/events/sos", ensureAuthenticated, (req, res) => {
    db.sequelize
      .query(
        "select el.*, r.floor_id, el.room_id, fl.number as floor_num, ev.sos, r.name, r.number from event_logs el\n" +
          "inner join events ev on ev.id = el.event_id\n" +
          "inner join rooms r on r.id = el.room_id\n" +
          "inner join floors fl on fl.id = r.floor_id " +
          "where sos=:sos and el.created_at=el.updated_at " +
          "order by el.created_at desc",
        { replacements: { sos: true }, type: sequelize.QueryTypes.SELECT }
      )
      .then(function (events) {
        if (!events) {
          res.json({
            success: false,
            data: {
              msg: "No  SOS events found",
            },
          });
        } else {
          res.json({
            success: true,
            msg: "Found SOS events",
            data: events,
          });
        }
      });
  });

  //Find all events when on floors list

  router.get("/events/", ensureAuthenticated, (req, res) => {
    db.sequelize
      .query(
        "select el.*, r.floor_id, el.room_id, ev.code, ev.message, r.name, r.number from event_logs el\n" +
          "inner join events ev on ev.id = el.event_id\n" +
          "inner join rooms r on r.id = el.room_id order by el.created_at desc limit 20",
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(function (events) {
        if (!events) {
          res.json({
            success: false,
            data: {
              msg: "No events found",
            },
          });
        } else {
          res.json({
            success: true,
            msg: "Successfully found events",
            data: events,
          });
        }
      });
  });

  //Find all events for a specific floor

  router.get("/events/getByFloorId", ensureAuthenticated, (req, res) => {
    db.sequelize
      .query(
        "select el.*, r.floor_id, el.room_id, r.name, r.number, ev.code, ev.message from event_logs el\n" +
          "inner join events ev on ev.id = el.event_id\n" +
          "inner join rooms r on r.id = el.room_id where r.floor_id = :floorID order by el.created_at desc limit 20",
        {
          replacements: {
            floorID: req.query.id,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then(function (events) {
        if (!events) {
          res.json({
            success: false,
            data: {
              msg: "No events found",
            },
          });
        } else {
          res.json({
            success: true,
            msg: "Successfully found events",
            data: events,
          });
        }
      });
  });

  //Find all events for a specific room

  router.get("/events/getByRoomId", ensureAuthenticated, (req, res) => {
    db.sequelize
      .query(
        "select el.*, r.floor_id, el.room_id, r.name, r.number, ev.code, ev.message from event_logs el\n" +
          "inner join events ev on ev.id = el.event_id\n" +
          "inner join rooms r on r.id = el.room_id where r.id = :roomID order by el.created_at desc limit 20",
        {
          replacements: {
            roomID: req.query.id,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then(function (events) {
        if (!events) {
          res.json({
            success: false,
            data: {
              msg: "No events found",
            },
          });
        } else {
          res.json({
            success: true,
            msg: "Successfully found events",
            data: events,
          });
        }
      });
  });

  router.post("/events/createKey", (req, res) => {
    if (req.body.key_status) {
      db.event_log
        .create({
          event_id: 1,
          room_id: req.body.id,
        })
        .then((result) => {
          if (result) {
            res.json({
              success: true,
              data: {
                event: result,
                msg: "Key inserted",
              },
            });
          } else {
            res.json({
              success: false,
              data: {
                msg: "Something went wrong",
              },
            });
          }
        });
    } else {
      db.event_log
        .create({
          event_id: 2,
          room_id: req.body.id,
        })
        .then((result) => {
          if (result) {
            res.json({
              success: true,
              data: {
                event: result,
                msg: "Key taken out",
              },
            });
          } else {
            res.json({
              success: false,
              data: {
                msg: "Something went wrong",
              },
            });
          }
        });
    }
  });

  router.post("/events/createWindow", (req, res) => {
    if (req.body.window_status) {
      db.event_log
        .create({
          event_id: 5,
          room_id: req.body.id,
        })
        .then((result) => {
          if (result) {
            res.json({
              success: true,
              data: {
                event: result,
                msg: "Window opened",
              },
            });
          } else {
            res.json({
              success: false,
              data: {
                msg: "Something went wrong",
              },
            });
          }
        });
    } else {
      db.event_log
        .create({
          event_id: 6,
          room_id: req.body.id,
        })
        .then((result) => {
          if (result) {
            res.json({
              success: true,
              data: {
                event: result,
                msg: "Window closed",
              },
            });
          } else {
            res.json({
              success: false,
              data: {
                msg: "Something went wrong",
              },
            });
          }
        });
    }
  });

  router.post("/events/createDoor", (req, res) => {
    if (req.body.window_status) {
      db.event_log
        .create({
          event_id: 4,
          room_id: req.body.id,
        })
        .then((result) => {
          if (result) {
            res.json({
              success: true,
              data: {
                event: result,
                msg: "Door closed",
              },
            });
          } else {
            res.json({
              success: false,
              data: {
                msg: "Something went wrong",
              },
            });
          }
        });
    } else {
      db.event_log
        .create({
          event_id: 3,
          room_id: req.body.id,
        })
        .then((result) => {
          if (result) {
            res.json({
              success: true,
              data: {
                event: result,
                msg: "Door opened",
              },
            });
          } else {
            res.json({
              success: false,
              data: {
                msg: "Something went wrong",
              },
            });
          }
        });
    }
  });

  router.post("/events/createSos", (req, res) => {
    if (!req.body.sos_status) {
      db.event_log
        .create({
          event_id: 7,
          room_id: req.body.id,
        })
        .then((result) => {
          if (result) {
            res.json({
              success: true,
              data: {
                event: result,
                msg: "SOS activated",
              },
            });
          } else {
            res.json({
              success: false,
              data: {
                msg: "Something went wrong",
              },
            });
          }
        });
    }
  });

  // SOS checked timestamp update

  router.post("/events/sosCheck", (req, res) => {
    if (req.body.payload.sos) {
      db.event_log
        .create({
          event_id: 8,
          room_id: req.body.payload.room_id,
        })
        .then((result) => {
          if (result) {
            db.event_log
              .update(
                {
                  updated_at: req.body.timestamp,
                },
                {
                  where: { id: req.body.payload.id },
                  returning: true,
                  plain: true,
                }
              )
              .then(function (result) {
                if (result) {
                  db.room
                    .update(
                      {
                        sos_status: !req.body.payload.sos,
                      },
                      {
                        where: { id: req.body.payload.room_id },
                        returning: true,
                        plain: true,
                      }
                    )
                    .then(function (result) {
                      if (result) {
                        res.json({
                          success: true,
                          data: {
                            msg: "Changed SOS status",
                          },
                        });
                      } else {
                        res.json({
                          success: false,
                          data: {
                            msg: "Could not change the SOS status",
                          },
                        });
                      }
                    });
                } else {
                  res.json({
                    success: false,
                    data: {
                      msg: "Could not change the SOS status",
                    },
                  });
                }
              });
          } else {
            res.json({
              success: false,
              data: {
                msg: "Something went wrong",
              },
            });
          }
        });
    }
  });
};
