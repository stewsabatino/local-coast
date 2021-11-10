"use strict";
const express = require("express");
const app = express();
const port = process.env.port || 4444;
const createPlaylists = require("./routes/createPlaylist")
const discoverPlaylists = require("./routes/discoverPlaylists")
const login = require("./routes/login")
const signup = require("./routes/signup")
const userDash = require("./routes/userDash")


//user the createPlaylists.js to handle endpoints that start with /createPlaylists
app.use(express.json());
app.use("/createPlaylists", createPlaylists)

//user the discoverPlaylists.js to handle endpoints that start with /discoverPlaylists
app.use(express.json());
app.use("/discoverPlaylists", discoverPlaylists)

//user the login.js to handle endpoints that start with /login
app.use(express.json());
app.use("/login", login)

//user the signup.js to handle endpoints that start with /signup
app.use(express.json());
app.use("/signup", signup)

//user the userDash.js to handle endpoints that start with /userDash
app.use(express.json());
app.use("/userDash", userDash)



app.get('/', (req, res) => {
    //handle root
    res.send("hello root")
});




app.listen(port, err => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log(`listening on port ${port}`)
});