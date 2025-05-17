
const {PlexWebhookPayload} = require("../models/plexModels.js") 
const {guild_id, channel_id, markup} = require("../config.json")

const sendChannelNewContent = (payload) => {
	var event = new PlexWebhookPayload(payload)
	const channel = discordClient.channels.cache.get(channel_id)
	channel.send("New content testing - this needs to have markup added " + event.Metadata.title)
}



module.exports = {
	sendChannelNewContent
}
