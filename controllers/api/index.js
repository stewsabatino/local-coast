const router = require('express').Router();
// const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes')
const spotifyRoutes = require('./spotifyRoutes');

// router.use('/users', userRoutes);
router.use('/post', postRoutes)

router.use('/post', postRoutes);
router.use('/spotify', spotifyRoutes);


module.exports = router;
