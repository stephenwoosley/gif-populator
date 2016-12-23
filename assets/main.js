var bands = ["Journey", "U2", "Mutemath", "Fleet Foxes", "The 1975"];

var bandTyped = ""

var giphyBaseSearchURL = "https://api.giphy.com/v1/gifs/search?q=";

var giphyURLkeyAndLimiter = "&api_key=dc6zaTOxFJmzC&limit=10";

$(document).ready(function(){

	fillBandArray();

	$("#add-button").on("click", function(e){
	e.preventDefault();
	console.log("bandTyped var BEFORE this entry was: "+ bandTyped);
	bandTyped = $("#add-band").val().trim();
	console.log("bandTyped var AFTER this entry is: "+ bandTyped);
	bands.push(bandTyped);
	$("#bands").empty();
	fillBandArray();
	});

	$(".band-name-button").on("click", function(e){
		e.preventDefault();
		var value = $(this).text().trim();
		var queryURL = giphyBaseSearchURL + value + giphyURLkeyAndLimiter;
		console.log(queryURL);
		// var encoded = encodeURIComponent(queryURL);
		// console.log(encoded);
		// console.log(this);
		// console.log("band name button clicked");
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(resultingGIFData){

			var gifArray = resultingGIFData.data;

			for(var i = 0; i < gifArray.length; i++) {

				var gif = gifArray[i].images.original.url;
				var stillgif = gifArray[i].images.original_still.url;
				$("#gifs").append("<img src="+gif+"/>");
			}
		})
	})

});



function fillBandArray(){

	for (band in bands) {
		$("#bands").append("<button class='btn btn-primary band-name-button'>" + bands[band] + "</button>");
	}
}

	



