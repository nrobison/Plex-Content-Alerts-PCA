
const {PlexWebhookPayload} = require("../models/plexModels.js") 
const {guild_id, channel_id,show_genres, show_scores} = require("../config.json")
const {displayTitleYearString, displayRatingsString, displayGenresString, displaySummaryString, displayNewContentString} = require("./markupService.js")

//title + YEAR is BOLD
//Genre is italics
//Rating is underlined

const sendChannelNewContent = (payload) => {
	var event = new PlexWebhookPayload(payload)
	const channel = discordClient.channels.cache.get(channel_id)
	var messageToSend = ""
	messageToSend += displayNewContentString(event.Metadata.type) + "\n" + displayTitleYearString(event.Metadata.title, event.Metadata.year) + " "
	if(show_genres){
		messageToSend += displayGenresString(event.Metadata.Genre) + "\n"
	}
	if(show_scores){
		messageToSend += displayRatingsString(event.Metadata.Rating) + "\n"
	}
	messageToSend += displaySummaryString(event.Metadata.summary)
	channel.send(messageToSend)
}


module.exports = {
	sendChannelNewContent
}
