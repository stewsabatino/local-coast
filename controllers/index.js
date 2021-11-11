const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const playlistRoutes = require('./playlistRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/playlist', playlistRoutes);

module.exports = router;
