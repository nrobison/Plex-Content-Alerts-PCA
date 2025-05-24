
const {PlexWebhookPayload} = require("../models/plexModels.js") 
const {guild_id, channel_id, markup} = require("../config.json")
const {displayTitleYearString, displayRatingsString, displayGenresString, displaySummaryString} = require("./markupService.js")

//title + YEAR is BOLD
//Genre is italics
//Rating is underlined

const sendChannelNewContent = (payload) => {
	var event = new PlexWebhookPayload(payload)
	const channel = discordClient.channels.cache.get(channel_id)
	channel.send(displayTitleYearString(event.Metadata.title, event.Metadata.year) + " " +
			(displayGenresString(event.Metadata.Genre)) + "\n" + 
			(displayRatingsString(event.Metadata.Rating)) + "\n" + 
			(displaySummaryString(event.Metadata.summary))
	)
}


module.exports = {
	sendChannelNewContent
}
