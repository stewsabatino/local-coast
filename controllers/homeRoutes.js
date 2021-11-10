const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
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
