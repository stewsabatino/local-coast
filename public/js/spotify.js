const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

const playlistAddHandler = (event) => {
    const id = getElementById('add-to-home').getAttribute("value");
    const singlePlaylist = spotifyApi.getUserPlaylist(id);
    singlePlaylist;
    const response = await fetch('/api/users/login', { 
            method: 'POST', 
            body: JSON.stringify({ // body content as JSON 
                email: email.value,
                pass: pass.value, 
                }), 
            header: { 'Content-Type': 'application/json' }, 
        });
    if (response.ok) { 
        document.location.replace('/dashboard');
    } else {
        alert(`Yuht-Oh, Login attempt failed`);
        console.log(response);
    }
}

document.getElementById('add-to-home').addEventListener('click', playlistAddHandler);

module.exports = singlePlaylist;
