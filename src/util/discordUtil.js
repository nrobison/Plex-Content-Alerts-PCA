
const {PlexWebhookPayload} = require("../models/plexModels.js") 
const {guild_id, channel_id, markup} = require("../config.json")
const { blockQuote, bold, italic, quote, spoiler, strikethrough, underline, subtext } = require('discord.js');

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

function displayTitleYearString(title, year){
	return bold(title + " " + "(" + year + ")")

}

function displaySummaryString(summary){
	return blockQuote(summary) 
}


function capitolFirstLetter(Rating){
	return capitalizedRating = Rating.type.charAt(0).toUpperCase() + Rating.type.slice(1) //Capitalize the first letter of the rating type
}

function displayRatingsString(Rating){ //CAP "R" for Rating
	var ratingsString = " " 
	Rating.forEach(Rating => {
			const ratingsSource = Rating.image.match(/^([a-z]+):\/\//i)?.[1]; 
		ratingsString += "• " + ratingsSource + ": " + Rating.value + " " +
		 "(" + capitolFirstLetter(Rating) + ")" +" "
	});

	return underline(ratingsString) 
}

function displayGenresString(genre) {
	if (!Array.isArray(genre) || genre.length === 0) {
		return italic("Genre not provided");
	}

	// Sort by Genre.count descending and then take the top 2
	const top2Genres = genre
		.sort((FirstHighestCount, SecondHighestCount) => SecondHighestCount.count - FirstHighestCount.count)
		.slice(0, 2);

	// Build string of just the tags
	let genresString = top2Genres.map(g => g.tag).join("/");

	return italic(genresString);
}


module.exports = {
	sendChannelNewContent
}
