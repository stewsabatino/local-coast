const router = require('express').Router();
const { User, Playlist, Comment, Like } = require('../models');
const SpotifyWebApi = require('spotify-web-api-node');
const { findAll } = require('../models/User');
const spotifyApi = new SpotifyWebApi();

// Post Current Users Added Playlist to the page
router.get('/', async (req, res) => {
    try{
        const userPostData = await User.findAll({
            where: {
                access_token: req.session.access_token
            },
            attributes: [
                'id', 
                'name',
                'email'
            ],
            include: [{
                model: Playlist,
                attributes: ['title', 'link'],
            }]
        });
        res.json(userPostData);
        console.log(userPostData);
    } catch (err) {
        console.log(err);
    }

})

module.exports = router;