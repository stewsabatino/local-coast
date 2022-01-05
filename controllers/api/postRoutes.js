const router = require('express').Router();
const { Playlist } = require('../../models');

router.post('/new', async (req, res) => {
    try {
        console.log(req.body);
        const playlistData = await Playlist.create({
            link: req.body.link,
            title: req.body.title,
            length: req.body.plength,
            playlist_id: req.body.pid,
            user_id: req.body.user_id
        })
        res.json(playlistData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});




module.exports = router;