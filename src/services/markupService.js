const {blockQuote, bold, italic, underline} = require('discord.js')
const {show_audience_scores, show_critic_scores, critic_sources} = require('../config.json')
const { MetadataModel } = require('../models/plexModels')

function displayTitleYearString(title, year){
	return "\*\*" + title + " " + "(" + year + ")" + "\*\*" + " " + "\:projector:" + " "  //Bold title and year)

}

function displayNewContentString(type){
	if (type == "movie"){
	return "\# " + "New Content Added: " + capitolFirstContent(type) +   "\:projector:"}
	else if (type == "episode"){
	return "\# " + "New Content Added: " + capitolFirstContent(type) + "\:tv:"}
}

function displaySummaryString(summary){
	//return "\>\>\>" + " " + summary //Block quote style summary 
	return "\`\`\`" + summary + "\`\`\`" //Code block style summary
}


function capitolFirstLetter(Rating){
	return capitalizedRating = Rating.type.charAt(0).toUpperCase() + Rating.type.slice(1) //Capitalize the first letter of the rating type
}

function capitolFirstContent(type){
	return capitalizedContent = type.charAt(0).toUpperCase() + type.slice(1) //Capitalize the first letter of the content type
}

function displayRatingsString(Rating){ //CAP "R" for Rating
	const sourceImageDisplayNames = {
	"imdb": "IMDB",
	"rottentomatoes": "Rotten Tomatoes",
	"themoviedb": "The Movie DB",
	};
	var ratingsString = " "
    
    var sourcesWanted =  critic_sources.map(item => {
        if(item == "tmdb"){
            return "themoviedb"
        }
        else{
            return item.replace(/\s/g, '')
        }
    })
    
	Rating.forEach(Rating => {
		var ratingsSource = Rating.image.match(/^([a-z]+):\/\//i)?.[1]; 
		const properSourceName = sourceImageDisplayNames[ratingsSource] || ratingsSource;

        if(sourcesWanted.includes(ratingsSource) && ((show_audience_scores && Rating.type == "audience") || (show_critic_scores && Rating.type == "critic"))){
		    ratingsString += properSourceName + ": " + Rating.value + " " +
		    "(" + capitolFirstLetter(Rating) + ")" +" "
        }
	});

	return "•" + "\_\_" + ratingsString + "\_\_" //Underlined rating
}

function displayGenresString(genre) {
	if (!Array.isArray(genre) || genre.length === 0) {
		return "\*" + "n/a" + "\*"; // Italics genre not provided
	}

	// Sort by Genre.count descending and then take the top 2
	const top2Genres = genre
		.sort((FirstHighestCount, SecondHighestCount) => SecondHighestCount.count - FirstHighestCount.count)
		.slice(0, 2);

	// Build string of just the tags
	let genresString = top2Genres.map(g => g.tag).join("/");

	return "\*" + genresString + "\*"; // Italics genre
}

module.exports = {
    displayGenresString,
    displayRatingsString,
    capitolFirstLetter,
    displaySummaryString,
    displayTitleYearString,
	displayNewContentString
}