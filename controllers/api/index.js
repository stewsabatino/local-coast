const router = require('express').Router();

const postRoutes = require('./postRoutes')
const spotifyRoutes = require('./spotifyRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes')

router.use('/likes', likeRoutes)
router.use('/comments', commentRoutes);
router.use('/post', postRoutes);
router.use('/spotify', spotifyRoutes);


module.exports = router;
