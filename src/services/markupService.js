const {blockQuote, bold, italic, underline} = require('discord.js')

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
    displayGenresString,
    displayRatingsString,
    capitolFirstLetter,
    displaySummaryString,
    displayTitleYearString
}