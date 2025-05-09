const webhookReceived = async(req, res) => {
    console.log("We got a post to /plexwebhook")
    res.status(200).json({message: "success"})
}

module.exports = {
    webhookReceived
};