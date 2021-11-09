const User = require('./User');
const Playlist = require('./Playlist');
const Comment = require('./Comment');
const Like = require('./Like')

User.hasMany(Playlist, {
    foreignKey: 'user_id',
});

Playlist.belongsTo(User, {
    foreignKey: 'user_id',
});


Playlist.hasMany(Comment, {
    foreignKey: 'post_id',
});

Comment.belongsTo(Playlist, {
    foreignKey: 'post_id',
});


User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


Playlist.hasMany(Like, {
    foreignKey: 'post_id',
});

Like.belongsTo(Playlist, {
    foreignKey: 'post_id',
});


Comment.hasMany(Like, {
    foreignKey: 'comment_id',
});

Like.belongsTo(Comment, {
    foreignKey: 'comment_id',
});


User.hasMany(Like, {
    foreignKey: 'user_id',
});

Like.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Playlist, Comment, Like };
