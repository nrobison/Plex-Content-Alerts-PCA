
const webhookReceived = async(req, res) => {
   
    //Multer processes the data and we read from request body payload. 
    var plexData = JSON.parse(req.body.payload)
    
    //console.log(plexData)

    //Respond with 200 
    res.send(200)
}

module.exports = {
    webhookReceived
};