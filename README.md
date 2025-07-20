# PCA - Plex Content Alert
PCA - Plex Content Alert is a node.js application to serve discord notifications of new content added to a plex server. When new content is added a message is generated and sent to a discord bot for posting. 

PCA will handle both movies and tv show additions. 

## Example of Notifications

Example of a Movie addition to plex with the default settings enabled.
<img src='.\Readme\Alert-Example.png' alt='Next Friday Movie addition'>

Example of a TV show addition to plex with default settings enabled
<img src='.\ReadMe\Alert-Tv-Example.png' alt='Downton Abbey S2:E1 addition'>

## Pre-requestes 
1. Node installed - Available [here](https://nodejs.org/en/download)
2. Confirm Node and npm is installed by running ``` node -v ``` and ``` npm -v ``` 


## Setup

1. Clone this repo locally or download
2. Create or have a Discord bot available for your discord server. If you do not have a bot already available see Setting up a Discord Bot section
3. Using a terminal or command line run ```npm install `` to install package dependencies 
4. Updating the ```config.json``` file
    1. This  


## Setting up a Discord Bot

1.  [Discord Developer](https://discord.dev)
2. Create a new application with your developer account by clicking  "New Application" [here](https://discord.com/developers/applications) 
3. Give your bot a name and accept the terms
4. Navgiate to the inInstallation settings section
5. Copy the Install Link into another browser window.  <img src='./Readme/Install-Link-Example.png'>
6. Install the bot on your server
7. Confirm the bot has been added succesfully by right clicking your server -> Server Settings -> Integrations and confirming your bot is listed
8. The bot does not require special permissions




