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
// User.create 
// user.name = display_name



router.get('/dashboard', async (req, res) => {
  spotifyApi.setAccessToken(req.session.access_token || process.env.SPOTIFY_ACCESS_TOKEN);
  spotifyApi.setRefreshToken(req.session.refresh_token);
  try {

    const me = await spotifyApi.getMe();
    const userData = await User.findOne({ 
      where: { email: me.body.email },
      include: [{ model: Playlist }, { model: Comment }, { model: Like }], 
    })
    
    const users = userData.get({ plain: true })

    if (!userData) {
      const newUser = await User.create({
        name: me.body.display_name,
        email: me.body.email,
        spotify_id: me.body.id
      });
      
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;

      console.log(newUser);
      res.render('userDash', newUser);
      });

    } else {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
      console.log(users)
      res.render('userDash', {
        users,
        user_id: req.session.user_id,
        logged_in: req.session.logged_in
      })
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/editPlaylist/:id', async (req, res) => {
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
      res.render('editPlaylist', {
          playlists,
          logged_in: req.session.logged_in,
      })
  } catch (err) {
      res.status(500).json(err);
      };
})

module.exports = router;
