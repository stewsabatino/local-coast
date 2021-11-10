const formHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Send the e-mail and password to the server
    document.location.replace('spotify-login')
};

document
    .querySelector('.button')
    .addEventListener('click', formHandler);