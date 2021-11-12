const pid = document.getElementById('p-id').innerHTML;
    // const singlePlaylist = spotifyApi.getUserPlaylist(id);
    const ptitle = document.getElementById('p-name').innerHTML;
    const puri = document.getElementById('p-uri').innerHTML;
    const plength = 200;
    const user_id = 2;
const playlistAddHandler = async (event) => {
    event.preventDefault();
    
    const response = await fetch(`/api/post/new`, { 
            method: 'POST', 
            body: JSON.stringify({
                ptitle,
                plength,
                pid,
                user_id
            }),
            header: { 'Content-Type': 'multipart/form-data' }
        });
    if (response.ok) { 
        document.location.replace('/dashboard');
    } else {
        alert(`Yuht-Oh, Login attempt failed`);
        console.log(response);
    }
}

document.querySelector('#add-playlist-form').addEventListener('submit', playlistAddHandler);
