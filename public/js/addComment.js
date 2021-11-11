async function formHandler(event) {
    event.preventDefault();

    const entry = document.querySelector('#comment').value.trim();
    const playlist_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (entry) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                entry,
                playlist_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}


document.querySelector('.new-comment-form').addEventListener('submit', formHandler);