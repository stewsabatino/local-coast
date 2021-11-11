const router = require('express').Router();
const { Comment } = require('../../models');
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).res.json();
    }
});

// Find one comment 
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).res.json();
    }
});


router.post('/', async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                    entry: req.body.comment_text,
                    user_id: req.session.user_id
                });
            res.json(commentData);
        } 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;