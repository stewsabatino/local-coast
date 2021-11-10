"use strict";
const express = require("express");
let router = express.Router();

router.use(function(req, res, next) {
    console.log(req.url, "@", Date.now()); 
    next();
});

router
.route("/discoverPlaylists")
.get((req, res) => {
  ///things/cars
  res.send("hi get /discoverPlaylists");
})
.post((req, res) => {
  res.send("hi post /discoverPlaylists");
});

router
.route("/filter")
.get((req, res) => {
  ///things/cars
  res.send("hi get /discoverPlaylists/filter");
})
.post((req, res) => {
  res.send("hi post /discoverPlaylists/filter");
});

router
.route("/commentPlaylist")
.get((req, res) => {
  res.send("hi get /discoverPlaylists/commentPlaylist");
})
.put((req, res) => {
  res.send("hi put /discoverPlaylists/commentPlaylist");
});

router
.route("/comment:user_id")
.get((req, res) => {
  res.send("hi get /discoverPlaylists/commentPlaylist" + req.params.user_id);
})
.put((req, res) => {
  res.send("hi put /discoverPlaylists/commentPlaylist" + req.params.user_id);
});

module.exports = router;