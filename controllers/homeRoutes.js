const router = require('express').Router();
const { User, Playlist, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');




router.get('/', async (req, res) => {
  console.log('get method')
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

module.exports = router;
