const router = require('express').Router();
const { User, Playlist, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

router.get('/:id', async (req, res) => {
    // console.log(req.params)
    try {
        const playlistData = await Playlist.findByPk(req.params.id, {
            include: [
                { model: Comment },
                { model: User },
                { model: Like }
            ]
        })
      
        const playlists = playlistData.get({ plain: true })
        console.log(playlists)
        res.render('singlePost', {
            playlists,
            logged_in: req.session.logged_id,
            user_id: req.session.user_id
        })
    } catch (err) {
        res.status(500).json(err);
        };
  })
  

module.exports = router