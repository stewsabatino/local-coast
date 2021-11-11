//  const addPlaylistHandler = async (event) => {
//     // Stop the browser from submitting the form so we can do so with JavaScript
//     event.preventDefault();
//       // Send the e-mail and password to the server
//       const response = await fetch('/add', {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/');
//       } else {
//         alert('No playlist data found');
//       }
// };
  
// document.getElementById('add-playlist').addEventListener('click', addPlaylistHandler);