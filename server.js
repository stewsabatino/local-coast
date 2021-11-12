// require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const formidable = require('formidable');
// Spotify Specific Authorization Packages
// const request = require('request'); // "Request" library
// const cors = require('cors');
// const querystring = require('querystring');
// const cookieParser = require('cookie-parser');


const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// API - Node Package 
const SpotifyWebApi = require('spotify-web-api-node');

// API - Node Package
const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// Add express-session and store as Express.js middleware
app.use(session(sess));




// API - Node Package
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID || '319241da7db34052a52158f93943b6b7',
  clientSecret: process.env.CLIENT_SECRET || '3e9808eeaa3c40a78bc1f49af1cd8f70',
  redirectUri: 'https://local-coast.herokuapp.com/callback' || 'http://localhost:3001/callback'
});



// API - Node Package
app.get('/spotify-login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes)); // API - Node Library created Authorization
});
// API - Node Package
app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
  .authorizationCodeGrant(code)
  .then(data => {
    const access_token = data.body['access_token'];
    const refresh_token = data.body['refresh_token'];
    const expires_in = data.body['expires_in'];

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    console.log('access_token:', access_token);
    console.log('refresh_token:', refresh_token);

    console.log(
      `Sucessfully retreived access token. Expires in ${expires_in} s.`
    );
    
    // res.render('homepage');
    req.session.save(()=> {
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;
      
    
      res.redirect('/dashboard');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
        req.session.save(()=> {
          req.session.access_token = access_token;
          req.session.refresh_token = refresh_token; })
      }, expires_in / 2 * 1000);
    })
})
  .catch(error => {
    console.error('Error getting Tokens:', error);
    res.send(`Error getting Tokens: ${error}`);
  });
});

// Spotify - Credentials
// const client_id = process.env.CLIENT_ID || '319241da7db34052a52158f93943b6b7'; // Your client id
// const client_secret = process.env.DB_SECRET || '3e9808eeaa3c40a78bc1f49af1cd8f70'; // Your secret
// const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3001/callback'; // Your redirect uri

const hbs = exphbs.create({ helpers });







app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);
 
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
