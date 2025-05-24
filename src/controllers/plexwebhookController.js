const {sendChannelNewContent} = require('../services/discordMessageService.js')

const webhookReceived = async(req, res) => {
   
    //Multer processes the data and we read from request body payload. 
    var plexData = JSON.parse(req.body.payload)
    
    //console.log(plexData)
    console.dir(plexData, {depth: null, colors: true}); //fully expanded nested data (deep objects) - this isn't expanded by default with console.log
    //Respond with 200
    sendChannelNewContent(plexData) 
    res.send(200)
}

module.exports = {
    webhookReceived
};