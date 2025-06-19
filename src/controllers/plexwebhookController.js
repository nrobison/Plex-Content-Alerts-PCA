const {processNewWebhookMessage} = require('../services/discordMessageService.js')
const { insertActivity } = require('../services/database.js');

const webhookReceived = async(req, res) => {
   
    //Multer processes the data and we read from request body payload. 
    var plexData = JSON.parse(req.body.payload)

    //console.log(plexData)
    console.dir(plexData, {depth: null, colors: true}); //fully expanded nested data (deep objects) - this isn't expanded by default with console.log
    
        // db information wanted
        const showTitle = plexData.Metadata?.grandparentTitle || plexData.Metadata?.title || 'Unknown Show';
        const episodeTitle = plexData.Metadata?.title || 'Unknown Episode';
        //const timestamp = new Date().toISOString(); // data and timestamp for multiple episode check 
        const timestamp = new Date().toLocaleString('en-US', { //timestamp in a more readable format
        dateStyle: 'long',
        timeStyle: 'short',
        });
        //insert into plex_content.db
        insertActivity(showTitle, episodeTitle, timestamp);

    //Respond with 200
    processNewWebhookMessage(plexData) 
    res.send(200)
}

module.exports = {
    webhookReceived
};