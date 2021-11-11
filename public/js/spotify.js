const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

const playlistAddHandler = (event) => {
    const id = getElementById('add-to-home').getAttribute("value");
    const singlePlaylist = spotifyApi.getUserPlaylist(id);
    return singlePlaylist;
}

document.getElementById('add-to-home').addEventListener('click', playlistAddHandler);

module.exports = singlePlaylist;
