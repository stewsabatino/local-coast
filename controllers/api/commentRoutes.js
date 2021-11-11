const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models')



router.post('/', async (req, res) => {
    console.log(req.body)
    try { 
        const commentData = await Comment.create({
            entry: req.body.entry,
            user_id: 3,
            playlist_id: req.body.playlist_id
        })
        res.json(commentData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})

module.exports = router;