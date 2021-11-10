"use strict";
const express = require("express");
let router = express.Router();

router.use(function(req, res, next) {
    console.log(req.url, "@", Date.now()); 
    next();
});

router
.route("/login")
.get((req, res) => {
  ///things/cars
  res.send("hi get /login");
})
.post((req, res) => {
  res.send("hi post /login");
});

module.exports = router;