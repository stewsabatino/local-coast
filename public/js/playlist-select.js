const playlistFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
   
    // if (email && password) {
      // Send the e-mail and password to the server
      
      const response = await fetch('/api/spotify/user', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    // }
  };
  
  document
    .querySelector('.playlist-form')
    .addEventListener('submit', playlistFormHandler);
  