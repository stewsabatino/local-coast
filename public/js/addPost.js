async function formHandler (event) {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const link = document.querySelector('#link').value.trim();
    const length = document.querySelector('#length').value.trim();

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title,
            link,
            length
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


document.querySelector('.new-post-form').addEventListener('submit', formHandler);