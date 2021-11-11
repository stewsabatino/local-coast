const router = require('express').Router();
const { User, Playlist, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage')
} catch (err) {
    res.status(500).json(err)
}
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.access_token) {
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
// User.create 
  // user.name = display_name



router.get('/dashboard', async (req, res) => {
    spotifyApi.setAccessToken(req.session.access_token || process.env.SPOTIFY_ACCESS_TOKEN);
    spotifyApi.setRefreshToken(req.session.refresh_token);
    try {
      // const users = userData.map((project) => project.get({ plain: true }));
        const me = await spotifyApi.getMe();
        console.log(me.body.id);
        
        req.session.save(() => {
          req.session.spotify_id = me.body.id;
        });
        
        // const meData = me.get({ plain: true });
        // We need to account for users that were already created. 
        const newUser = await User.create({
          name: me.body.display_name,
          email: me.body.email,
          spotify_id: me.body.id
        });
        
        
        console.log(newUser);
        res.render('userDash', newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;
