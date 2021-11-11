const User = require('./User');
const Playlist = require('./Playlist');
const Comment = require('./Comment');
const Like = require('./Like')
const Genre = require('./Genre')

User.hasMany(Playlist, {
    foreignKey: 'user_id',
});

Playlist.belongsTo(User, {
    foreignKey: 'user_id',
});


Playlist.hasMany(Comment, {
    foreignKey: 'playlist_id',
});

Comment.belongsTo(Playlist, {
    foreignKey: 'playlist_id',
});


User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


Playlist.hasMany(Like, {
    foreignKey: 'playlist_id',
});

Like.belongsTo(Playlist, {
    foreignKey: 'playlist_id',
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


Playlist.hasMany(Genre, {
    foreignKey: 'playlist_id',
});

Genre.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
})


module.exports = { User, Playlist, Comment, Like, Genre };
