
const {PlexWebhookPayload} = require("../models/plexModels.js") 
const {guild_id, channel_id, markup} = require("../config.json")
const { blockQuote, bold, italic, quote, spoiler, strikethrough, underline, subtext } = require('discord.js');
const { config } = require("chai");

//title + YEAR is BOLD
//Genre is italics
//Rating is underlined

const sendChannelNewContent = (payload) => {
	var event = new PlexWebhookPayload(payload)
	const channel = discordClient.channels.cache.get(channel_id)
	channel.send(displayTitleYearString(event.Metadata.title, event.Metadata.year) + " " + "\:projector:" +
			(displayGenresString(event.Metadata.Genre)) + "\n" + 
			(displayRatingsString(event.Metadata.Rating)) + "\n" + 
			(displaySummaryString(event.Metadata.summary))
)

}

function displayTitleYearString(title, year){
	//return bold(title + " " + "(" + year + ")")
	return "\*\*" + title + " " + "(" + year + ")" + "\*\*" //Bold title and year
	
}

function displaySummaryString(summary){
	return blockQuote(summary) 
}


function capitolFirstLetter(Rating){
	return capitalizedRating = Rating.type.charAt(0).toUpperCase() + Rating.type.slice(1) //Capitalize the first letter of the rating type
}

function displayRatingsString(Rating){ //CAP "R" for Rating
	const sourceImageDisplayNames = {
	"imdb": "IMDB",
	"rottentomatoes": "Rotten Tomatoes",
	"themoviedb": "The Movie DB",
	};
	var ratingsString = " " 
	Rating.forEach(Rating => {
			const ratingsSource = Rating.image.match(/^([a-z]+):\/\//i)?.[1]; 
			const properSourceName = sourceImageDisplayNames[ratingsSource] || ratingsSource;
		ratingsString += properSourceName + ": " + Rating.value + " " +
		 "(" + capitolFirstLetter(Rating) + ")" +" "
	});

	//return underline(ratingsString) 
	return "• " + "\_\_" + ratingsString + "\_\_" //Underlined rating
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

	//return italic(genresString);
	return "\*" + genresString + "\*" //Italics genre
}
//if show critic ratings = true, show critic ratings - based on config file settings

function displayCriticRatings(Rating){
	if (config.show_critic_scores === true) {
		return displayRatingsString(Rating)
}
	else {
		return "" //blank string, nothing, or message? 
	}
}

function displayAudienceRatings(Rating){
	if (config.show_audience_scores === true) {
		return displayRatingsString(Rating)
}
	else {
		return ""
	}
}

function doNotDisplayRatings(Rating){
	if (config.show_scores === false) {
		return ""
}
}

module.exports = {
	sendChannelNewContent
}
