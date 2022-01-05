const formLikeHandler = async (event) => {
    event.preventDefault();

    const user_id = document.querySelector('#uID').value;
    const playlist_id = document.querySelector('#pID').value;
    console.log(user_id);
    console.log(playlist_id);


    const response = await fetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify({ user_id, playlist_id }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        // document.location.reload();
        console.log('okay');
    } else { 
        alert('Failed to like.')
    }
};

document
.querySelector('.like-form')
.addEventListener('submit', formLikeHandler);