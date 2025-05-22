
const {PlexWebhookPayload} = require("../models/plexModels.js") 
const {guild_id, channel_id, markup} = require("../config.json")
const { blockQuote, bold, italic, quote, spoiler, strikethrough, underline, subtext } = require('discord.js');

//title + YEAR is BOLD
//Genre is italics
//Rating is underlined

const sendChannelNewContent = (payload) => {
	var event = new PlexWebhookPayload(payload)
	const channel = discordClient.channels.cache.get(channel_id)
	//channel.send(bold(event.Metadata.title + " " + "(" + event.Metadata.year + ")"))
	channel.send(displayTitleYearString(event.Metadata.title, event.Metadata.year) + " " +
			//(displayRatingsString(event.Metadata.audienceRating)) + "\n" + 
			(displayRatingsString(event.Metadata.Rating)) + "\n" + 
			(displaySummaryString(event.Metadata.summary))
)

}

function displayTitleYearString(title, year){
	return bold(title + " " + "(" + year + ")")

}

function displaySummaryString(summary){
	return blockQuote(summary) //Having "Summary" + summary felt unnecessary. Just sending summary
}


function capitolFirstLetter(Rating){
	return capitalizedRating = Rating.type.charAt(0).toUpperCase() + Rating.type.slice(1) //CAPITALIZE FIRST LETTER
}

function displayRatingsString(Rating){ //CAP "R" for Rating
	var ratingsString = " " //Empty string
	Rating.forEach(Rating => {
			const ratingsSource = Rating.image.match(/^([a-z]+):\/\//i)?.[1]; //has to be in the loop

		ratingsString += ratingsSource + ": " + Rating.value + " " +
		 "(" + capitolFirstLetter(Rating) + ")" +", "
	});

	return underline(ratingsString) 
}

function displayGenresString(genre){
	var genresString = " " //Empty string
	genre.forEach(Genre => {

		genresString += Genre.count + " " + Genre.tag + " "
	});

	return italic(genresString) 

	}

module.exports = {
	sendChannelNewContent
}
