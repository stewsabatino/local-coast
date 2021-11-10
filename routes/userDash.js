"use strict";
const express = require("express");
let router = express.Router();

router.use(function(req, res, next) {
    console.log(req.url, "@", Date.now()); 
    next();
});

router
.route("/userDash:user_id")
.get((req, res) => {
  ///things/cars
  res.send("hi get /userDash" + req.params.user_id);
})
.post((req, res) => {
  res.send("hi post /userDash" + req.params.user_id);
});

router
.route("/userDash/delete:user_id")
.get((req, res) => {
  ///things/cars
  res.send("hi get /userDash/delete" + req.params.user_id);
})
.post((req, res) => {
  res.send("hi post /userDash/delete" + req.params.user_id);
});

router
.route("/userDash/edit:user_id")
.get((req, res) => {
  ///things/cars
  res.send("hi get /userDash/edit" + req.params.user_id);
})
.post((req, res) => {
  res.send("hi post /userDash/edit" + req.params.user_id);
});

module.exports = router;

