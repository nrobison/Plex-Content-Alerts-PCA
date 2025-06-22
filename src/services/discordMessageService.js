
const {PlexWebhookPayload} = require("../models/plexModels.js") 
const {guild_id, channel_id,show_genres, show_scores, elapsed_time} = require("../config.json")
const {displayTitleYearString, displayRatingsString, displayGenresString, displaySummaryString, displayNewContentString, displayTopTwoRatings} = require("./markupService.js")
const {insertActivity, findRecentActivity, updateActivityTimestamp} = require('./databaseService.js')



const sendChannelNewContent = (event) => {
	const channel = discordClient.channels.cache.get(channel_id)
	var messageToSend = ""
	messageToSend += displayNewContentString(event.Metadata.type) + "\n" + displayTitleYearString(event.Metadata.type, event.Metadata.title, event.Metadata.year, event.Metadata.grandparentTitle) + " "
	if(show_genres){
		messageToSend += displayGenresString(event.Metadata.Genre) + "\n"
	}
	if(show_scores){
		messageToSend += displayRatingsString(event.Metadata.Rating, event.Metadata) + "\n"
	}
	messageToSend += displaySummaryString(event.Metadata.summary)
	channel.send(messageToSend)
}

const processNewWebhookMessage = (payload) => {
	const event = new PlexWebhookPayload(payload);

	//Only if library.new content 
	if (event.event === "library.new") {
		const showTitle = event.Metadata.grandparentTitle || event.Metadata.title || "Unknown Show";
		const episodeTitle = event.Metadata.title || "Unknown Episode";

		const now = new Date();
const nowISO = now.toISOString(); //storage and math; timestamp in ISO and ZT format

const previous = findRecentActivity(showTitle);
const elapsed_time_in_ms = elapsed_time * 60 * 1000; //convert elapsed_time from minutes to milliseconds

	if (previous) {
		const prevTime = new Date(previous.timestamp); //must be parseable
		const diff = now - prevTime;

	if (diff < elapsed_time_in_ms) {
		console.log(`⏱️ Skipping duplicate post for "${showTitle}". Last sent ${Math.round(diff / 60000)} minutes ago.`);
		return;
	} else {
		updateActivityTimestamp(showTitle, nowISO); 
	}
	} else {
		insertActivity(showTitle, episodeTitle, nowISO); 
	}

		sendChannelNewContent(event);
	}
};
module.exports = {
	processNewWebhookMessage
}
