"use strict";
const express = require("express");
let router = express.Router();

router.use(function(req, res, next) {
    console.log(req.url, "@", Date.now()); 
    next();
});

router
.route("/signup")
.get((req, res) => {
  ///things/cars
  res.send("hi get /signup");
})
.post((req, res) => {
  res.send("hi post /signup");
});

module.exports = router;