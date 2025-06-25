const {show_audience_scores, show_critic_scores, critic_sources, top_two_ratings, show_general_rating, custom_message} = require('../config.json')
const { MetadataModel } = require('../models/plexModels')

// function displayTitleYearString(title, year){
// 	return "\*\*" + title + " " + "(" + year + ")" + "\*\*" + " "  //Bold title and year)

// }

function displayTitleYearString(type, title, year, parentTitle, grandparentTitle) {
	if (type === "episode") {
		return "\*\*" + parentTitle + ": " + grandparentTitle + " " + "-" + " " + title + " " + "(" + year + ")" + "\*\*" + " ";
	} else {
		return "\*\*" + title + " " + "(" + year + ")" + "\*\*" + " ";
	}
}

/**
 * Generates a formatted message string indicating that new content has been added,
 * including an appropriate Discord emoji based on the type of content.
 *
 * @param {string} type - The type of media content (e.g., "movie" or "episode").
 * @returns {string|undefined} A formatted string announcing the new content with
 *                             an emoji, or undefined if the type is unrecognized.
 *
 * @example
 * displayNewContentString("movie");
 * // => "\# New Content Added: \:projector:" #Sets the headings fo Discord, and \:projector: is the emoji for movie in Discord
 *
 * displayNewContentString("episode");
 * // => "\# New Content Added: \:tv:"
 */
function displayNewContentString(type){
	if (type == "movie"){
	return "\# " + "New Content Added: " + "\:projector:"}
	else  {
	return "\# " + "New Content Added: " + "\:tv:"}
}

function displaySummaryString(summary){
	return "\`\`\`" + summary + "\`\`\`" //Code block style summary
}


/**
 * Capitalizes the first letter of the `type` property from a given Rating object.
 *
 * @param {Object} Rating - An object containing a `type` property (e.g., "audience", "critic").
 * @param {string} Rating.type - The type of rating to capitalize.
 * @returns {string} The `type` string with the first letter capitalized.
 *
 * @example
 * capitolFirstLetter({ type: "audience" });
 * // => "Audience"
 *
 * capitolFirstLetter({ type: "critic" });
 * // => "Critic"
 */
function capitolFirstLetter(Rating){
	return capitalizedRating = Rating.type.charAt(0).toUpperCase() + Rating.type.slice(1) //Capitalize the first letter of the rating type
}

function capitolFirstContent(type){
	return capitalizedContent = type.charAt(0).toUpperCase() + type.slice(1) //Capitalize the first letter of the content type
}


/**
 * Constructs a formatted string of ratings for a media item based on specified conditions.
 * Supports formatting for Discord markdown with underscores (e.g., __underline__).
 *
 * @param {Array<Object>} Rating - An array of rating objects, each with an `image`, `value`, and `type`.
 * @param {Object} Metadata - Metadata for the media item, potentially including `audienceRating`. **Is the general rating for the media item
 * @param {boolean} [isCustom=false] - Whether to return a raw string for custom message insertion (without Discord formatting).
 * @returns {string} A formatted rating string, either raw or with Discord markdown (e.g., "• \_\_IMDB: 8.2 (Audience)\_\_").
 *
 * @example
 * displayRatingsString([
 *   { image: "imdb://image.rating", value: 8.2, type: "audience" }
 * ], { audienceRating: 8.2 }, false);
 * // => "• \_\_IMDB: 8.2 (Audience)\_\_"
 */
function displayRatingsString(Rating, Metadata, isCustom = false){ //CAP "R" for Rating
	const sourceImageDisplayNames = {
	"imdb": "IMDB",
	"rottentomatoes": "Rotten Tomatoes",
	"themoviedb": "The Movie DB",
	};

	if (show_general_rating === true && Metadata?.audienceRating) { //change show_general_rating to true to show general rating
		return `• __Rating: ${Metadata.audienceRating}__`;
	}
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
	if(isCustom)return ratingsString
	return "•" + "\_\_" + ratingsString + "\_\_" //Underlined rating
}


/**
 * Generates a formatted string showing the top audience and critic ratings from Rotten Tomatoes.
 * Ratings are filtered to only include "rottentomatoes" sources, and the highest rating of each type is selected. **Can be changed to other sources 
 * If both are found, they are combined into a single string, underlined using Discord markdown (__).
 *
 * @param {Array<Object>} Rating - Array of rating objects, each containing `image`, `value`, and `type` ("audience" or "critic").
 * @returns {string} A formatted string of top two ratings or an empty string if no relevant ratings are found or `top_two_ratings` is false.
 *
 * @example
 * displayTopTwoRatings([
 *   { image: "rottentomatoes://image.rating", value: 92, type: "critic" },
 *   { image: "rottentomatoes://image.rating", value: 95, type: "audience" }
 * ]);
 * // => "• __Rotten Tomatoes: 92 (Critic) Rotten Tomatoes: 95 (Audience)__"
 */
function displayTopTwoRatings(Rating) {
	if (!top_two_ratings) return "";
	 const sourceImageDisplayNames = {
        "rottentomatoes": "Rotten Tomatoes"
    };

    let highestCriticRating = null;
    let highestAudienceRating = null;

    Rating.forEach(rating => {
        const source = rating.image.match(/^([a-z]+):\/\//i)?.[1];
        if (source !== "rottentomatoes") return;

        if (rating.type === "critic") {
            if (!highestCriticRating || rating.value > highestCriticRating.value) {
                highestCriticRating = rating;
            }
        } else if (rating.type === "audience") {
            if (!highestAudienceRating || rating.value > highestAudienceRating.value) {
                highestAudienceRating = rating;
            }
        }
    });

    let ratingsString = "";

	if (highestCriticRating) {
		ratingsString += `${sourceImageDisplayNames["rottentomatoes"]}: ${highestCriticRating.value} (${capitolFirstLetter(highestCriticRating)}) `;
	}

	if (highestAudienceRating) {
		ratingsString += `${sourceImageDisplayNames["rottentomatoes"]}: ${highestAudienceRating.value} (${capitolFirstLetter(highestAudienceRating)}) `;
	}

	return ratingsString ? "• __" + ratingsString.trim() + "__" : "";
}


/**
 * Returns a formatted string of the top two most frequent genres, sorted by their count.
 * If no genres are provided, returns "n/a" in italics using Discord markdown.
 * The returned genre tags are joined by a forward slash and wrapped in asterisks for italic formatting in Discord.
 *
 * @param {Array<Object>} genre - An array of genre objects, each containing `tag` and `count` properties.
 * @returns {string} A formatted genre string (e.g., "*Action/Drama*") or "*n/a*" if no valid genres are found.
 *
 * @example
 * displayGenresString([
 *   { tag: "Action", count: 120 },
 *   { tag: "Drama", count: 95 },
 *   { tag: "Comedy", count: 80 }
 * ]);
 * // => "*Action/Drama*"
 */
function displayGenresString(genre) {
	if (!Array.isArray(genre) || genre.length === 0) {
		return " "; // Italics genre not provided
	}

	// Sort by Genre.count descending and then take the top 2
	const top2Genres = genre
		.sort((FirstHighestCount, SecondHighestCount) => SecondHighestCount.count - FirstHighestCount.count)
		.slice(0, 2);

	// Build string of just the tags
	let genresString = top2Genres.map(g => g.tag).join("/");

	return "\*" + genresString + "\*"; // Italics genre
}

function processCustomMessage(data){
	var markup = custom_message
	//Process each possible variables
	markup = markup.replaceAll(/\{title\}/g, data.Metadata.title)
	markup = markup.replaceAll(/\{year\}/g, data.Metadata.year)
	markup = processCustomRatings(markup,data.Metadata.Rating)
//	markup = 
	markup = markup.replaceAll(/\{summary\}/g, data.Metadata.summary)
	return markup
}

function processCustomRatings(message,Ratings){
	//Each possible source
	Ratings.forEach(rating => {
		const ratingsSource = rating.image.match(/^([a-z]+):\/\//i)?.[1];
		const ratingString =  "/\{" + ratingsSource +"." + rating.type + "\}/g"
		message = message.replaceAll(ratingString)
	})
	return message
}

function processCustomGenre(message,genre){
		if (!Array.isArray(genre) || genre.length === 0) {
			return message.replaceAll(/\{genre\[\d+\]\}/g, "N/A")
	}
}


module.exports = {
    displayGenresString,
    displayRatingsString,
    capitolFirstLetter,
    displaySummaryString,
    displayTitleYearString,
	displayNewContentString,
	displayTopTwoRatings,
	processCustomMessage
}