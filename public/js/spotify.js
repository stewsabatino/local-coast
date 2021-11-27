
const playlistAddHandler = async (event) => {
    event.preventDefault();
    const pid = document.getElementById('p-id').innerHTML;
    // const singlePlaylist = spotifyApi.getUserPlaylist(id);
    const ptitle = document.getElementById('p-name').innerHTML;
    const puri = document.getElementById('p-uri').innerHTML;
    const plength = 200;
    const user_id = 2;
    
    const response = await fetch(`/api/post/new`, { 
            method: 'POST', 
            body: JSON.stringify({
                ptitle,
                plength,
                pid,
                user_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    if (response.ok) { 
        document.location.replace('/dashboard');
    } else {
        alert(`Yuht-Oh, Login attempt failed`);
        console.log(response);
    }
}

document.querySelector('#addHome').addEventListener('click', playlistAddHandler);
