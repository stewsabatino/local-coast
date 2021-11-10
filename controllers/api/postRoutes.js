const router= require('express').Router();
const { Playlist, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const playlistData = await Playlist.create({
            title: req.body.title,
            link: req.body.link,
            length: req.body.length,
        })
        res.json(playlistData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;