"use strict";
const express = require("express");
let router = express.Router();

router.use(function(req, res, next) {
    console.log(req.url, "@", Date.now()); 
    next();
});

router
.route("/createPlaylists")
.get((req, res) => {
  ///things/cars
  res.send("hi get /createPlaylists");
})
.post((req, res) => {
  res.send("hi post /createPlaylists");
});

router
.route("/create:user_id")
.get((req, res) => {
  ///things/cars
  res.send("hi get /createPlaylists/create" + req.params.user_id);
})
.post((req, res) => {
  res.send("hi post /createPlaylists/create" + req.params.user_id);
});

module.exports = router;
