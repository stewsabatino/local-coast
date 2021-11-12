async function formHandler(event) {
    event.preventDefault();

    const user_id = 2
    const playlist_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify({
            user_id,
            playlist_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    }
}


document.querySelector('.like-form').addEventListener('submit', formHandler);