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

// router.get('/newplaylist', (req, res) => {
//   res.render('createPlaylist')
//   return
// });

router.get('/discover', async (req, res) => {
  console.log('get method')
  try {
    console.log(req.body)
    console.log(req.session);
   
      const playlistData = await Playlist.findAll({
          include: [{ model: User }, { model: Comment }, { model: Like }],
          order: [
            ['id', 'DESC']
          ],
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
    const currentData = await User.findAll();
    const users = currentData.map((user) => {
      user.get({ plain: true });
    })
    const allUserPlaylists = await spotifyApi.getUserPlaylists(users.spotify_id); 
    // console.log(allUserPlaylists.body.items);
    // Added playlist data to the Dashboard to Display a list of user playlists after login. 
    const playlistData = await Playlist.findAll({
      include: [{ model: User }, { model: Comment }, { model: Like }],
      order: [
        ['id', 'DESC']
      ],
  })
  const playlists = playlistData.map((playlist) => playlist.get({ plain: true }))
   console.log(playlists)
  const me = await spotifyApi.getMe();
    const userData = await User.findOne({ where: { email: me.body.email } })
   
    if (!userData) {
      const newUser = await User.create({
        name: me.body.display_name,
        email: me.body.email,
        spotify_id: me.body.id
      });
       
      req.session.save(() => {
        req.session.user_id = me.body.id;
        res.render('userDash',  { userData: newUser, userPlaylists: playlists, playlistData: allUserPlaylists.body.items });
      })
    } else {
      req.session.save(() => {
        res.render('userDash', { userData, userPlaylists: playlists, playlistData: allUserPlaylists.body.items })
        req.session.user_id = userData.id;
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
    });

    const playlists = playlistData.get({ plain: true })
    console.log(playlists)
    res.render('editPlaylist', {
      playlists,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err);
  };
});


router.get('/newplaylist', async (req, res) => {
  try {
    const currentData = await User.findByPk(req.session.user_id, {
    })
    const user = currentData.get({ plain: true })
    const userData = await spotifyApi.getUserPlaylists(user.spotify_id);     
    res.render('userDash', { user:userData.body, user_id: req.session.user_id, logged_in: req.session.logged_in })
  } catch (err) {
    console.log(err);
      res.status(500).json(err);
  };
})

// 2nd Attempt to Store Playlist_id in DB 
// router.get('/newplaylist/add/:id', async (req, res) => {
//   try {
//     // const currentData = await User.findByPk(req.session.user_id, { })
//       // const user = currentData.get({ plain: true })
//       const setData = await Playlist.create({
//         spotify_playlist: req.body.id,
//       });
//       res.json(setData);
//       // { user: userData.body, user_id: req.session.user_id, logged_in: req.session.logged_in })
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// })

module.exports = router;
