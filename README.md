# Local Coast
  ------
  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Table of Contents
  ------

  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Tests](#tests)
  * [Questions & Contributions](#questions-contribute)
  * [Credits](#credits)
  * [Licenses](#licenses)

  ## Description
  ------
  Local coast is an application drafted and developed for the purpose of increasing spotify user interactions. The application focuses primarily on the creation of playlists, giving users a space to showcase their playlists and explore content from other users outside of the native spotify application. Built using Spotify-Node-Web-Api, Express, Sequelize, MySQL2, JavaScript and Handlebars.  \
  
  **Drafted & Developed w/**
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white) ![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE) ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![image](https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black)  ![image](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white) 
  
  #### Process
  ![image](https://user-images.githubusercontent.com/90655370/141558041-7a351ed5-d58b-43a7-b790-9529b2bdab13.png)

  #### Application 
  ![image](https://user-images.githubusercontent.com/90655370/141559865-b4e3393b-8ca6-4aca-ad67-30093f445104.png)

  #### Deployment
  [Heroku](https://local-coast.herokuapp.com/)

  ## Installation
    ------
  Get started using this application by following the instructions below.

  1. After cloning the repo to your local machine, open project directory in your terminal and install the required dependencies by running 
    <code>npm i</code>

  2. Keeping in mind that the application uses dotenv as a required dependency, you will then want authenticate with mysql by creating the .env file in the project root directory, which requires the following three variables to be set. 

  ![image](https://user-images.githubusercontent.com/90655370/141564905-e9029626-c692-4d89-b772-faf2c2c745e6.png)

  <code>DB_NAME=user_db
  DB_USER=your_mysql
  DB_PW=your_mysql_password
  </code>
 
  3. his application also uses Spotify-Node-Web-Api as a required package in order to authenticate your local application, you will also need to have a registered spotify application. Instructions for getting your application registered can be found at 
  [Spotify Quick Start] (https://developer.spotify.com/documentation/web-api/quick-start/)

  4. After registering your application with spotify, it is recommended you hide your Oauth credentials within the .env file as well
  Add the following 
  <code>
  SPOTIFY_REDIRECT_URI=your-redirect-uri
  SPOTIFY_CLIENT_SECRET=your-client-secret
  SPOTIFY_CLIENT_ID=your-client-id
  <code> 

  Per the spotify documentation, the redirect url will also need to be added to spotify apps settings.

  5. Use and seed the database by running the following code in your terminal
  <code>
  mysql -u root -p
  your-password
  USE user_db; 
  exit;
  </code>
  
  <code>npm run seed</code>
  
  6. Start the server with 
  <code>npm start</code> 

  7. In your browser, navigate to the url shown in the terminal.
  ![image](https://user-images.githubusercontent.com/90655370/141570265-d21a28b6-6532-451e-9bf2-24868b623107.png)


  ## Usage
  ------
  You will need to authenticate with spotify using the button on the homepage to become an added user in the database. Where your information    only be saved in a safe and secured session. 

  After authenticating the browser will automatically redirect to your dashboard, where you will be prompted to add a playlist from a list of your top-20 added playlists. 


  ## Contributing
  ------
  Feel free to fork, critique and contact as you wish! 
  
  
  ## Credits
  ------
  -- Stew Sabatino 
  [Portfolio] (https://stewsabatino.github.io/)
  
  -- Ian Clark 
  [Portfolio] (https://ianclark-fullstack.github.io/)

  -- Dan Morales
  [Portfolio] (https://danmorales2287.github.io)

  
  ## Questions
  ------
  Feel free to reach out!
  

  
  ### License
   2021 - MIT
  [MIT Info](https://choosealicense.com/licenses/mit/)



