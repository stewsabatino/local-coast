const sequelize = require('../config/connection');
const { User, Playlist, Comment, Like} = require('../models');

const userData = require('./userData.json');
const playlistData = require('./playlistData.json');
const commentData = require('./commentData.json');
const likeData = require('./likeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Playlist.bulkCreate(playlistData);
  await Comment.bulkCreate(commentData);
  await Like.bulkCreate(likeData);

  process.exit(0);
};

seedDatabase();