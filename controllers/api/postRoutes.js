const sequelize = require('../../config/connection');
const router = require('express').Router();
const { Playlist } = require('../../models');

router.post('/new', async (req, res) => {
    console.log(req.params);
    try {
        
        const playlistData = await Playlist.create({
            title: req.body.ptitle,
            link: req.body.pid,
            length: req.body.plength,
            user_id: req.body.user_id
        })
        res.json(playlistData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});




module.exports = router;