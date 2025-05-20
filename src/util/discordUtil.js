
const {PlexWebhookPayload} = require("../models/plexModels.js") 
const {guild_id, channel_id, markup} = require("../config.json")
const { blockQuote, bold, italic, quote, spoiler, strikethrough, underline, subtext } = require('discord.js');

//title + YEAR is BOLD
//Genre is italics
//Rating is underlined

const sendChannelNewContent = (payload) => {
	var event = new PlexWebhookPayload(payload)
	const channel = discordClient.channels.cache.get(channel_id)
	channel.send(bold(event.Metadata.title + " " + event.Metadata.year))
	channel.send(underline("Rating: " + event.Metadata.audienceRating))	

}



module.exports = {
	sendChannelNewContent
}
