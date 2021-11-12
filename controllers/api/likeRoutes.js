const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Like } = require('../../models')



router.post('/', async (req, res) => {
    console.log(req.body)
    try { 
        const likeData = await Like.create({
            user_id: req.body.user_id,
            playlist_id: req.body.playlist_id
        })
        res.json(likeData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})

module.exports = router;