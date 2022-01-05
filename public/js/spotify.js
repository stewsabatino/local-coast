const playlistAddHandler = async (event) => {
    event.preventDefault();
    // const singlePlaylist = spotifyApi.getUserPlaylist(id);
    const link = document.querySelector('#p-uri').value;
    const title = document.querySelector('#p-name').value;
    const plength = document.querySelector('#plength').value;
    const pid = document.querySelector('#p-id').value;
    const user_id = document.querySelector('#user-id').value;
    console.log(user_id);
    
    // const user_id = 2;
    
    const response = await fetch(`/api/post/new`, { 
            method: 'POST', 
            body: JSON.stringify({
                link,
                title,
                plength,
                pid,
                user_id,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    if (response.ok) { 
        document.location.replace('/discover');
    } else {
        alert(`Yuht-Oh, Login attempt failed`);
        console.log(response);
    }
}

document.querySelector('#sendNewContent').addEventListener('submit', playlistAddHandler);
