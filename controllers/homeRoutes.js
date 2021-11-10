const router = require('express').Router();
const { User, Playlist, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');





router.get('/', async (req, res) => {
  console.log('get method')
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
      const playlistData = await Playlist.findAll({
          include: [{ model: User }, { model: Comment }, { model: Like }],
      })
      const playlists = playlistData.map((playlist) => playlist.get({ plain: true }))
      console.log(playlists)
      res.render('homepage', {
          playlists,
      })
  } catch (err) {
      res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/newplaylist', (req, res) => {
  res.render('createPlaylist')
  return
});


router.get('/discover', async (req, res) => {
  console.log('get method')
  try {
      const playlistData = await Playlist.findAll({
          include: [{ model: User }, { model: Comment }, { model: Like }],
      })
      const playlists = playlistData.map((playlist) => playlist.get({ plain: true }))
      console.log(playlists)
      res.render('discover', {
          playlists,
      })
  } catch (err) {
      res.status(500).json(err)
  }
});



// Store in auth and check access token value in req sessions. 

router.get('/dashboard', async (req, res) => {
    spotifyApi.setAccessToken(req.session.access_token || process.env.SPOTIFY_ACCESS_TOKEN);
    try {
        const me = await spotifyApi.getMe();
        console.log(me);
        res.render('userDash', me);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
