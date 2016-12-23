

$(document).ready(function(){

	var bands = ["Journey", "U2", "Mutemath", "Fleet Foxes", "The 1975"];

	// var giphyBaseSearchURL = "http://api.giphy.com/v1/gifs/search?q=";

	// var giphyURLkeyAndLimiter = "&api_key=dc6zaTOxFJmzC&limit=10";

	// initial button manufacture
	makeBandButtons(bands, "band-name-button", "#bands");

	// when Add Band button is clicked, add the typed value as a button
	$("#add-button").on("click", function(e){
		e.preventDefault();
		var bandTyped = $("input").eq(0).val();
		bands.push(bandTyped);
		makeBandButtons(bands, "band-name-button", "#bands");
		$("#add-band").val("");
	});


	$(document).on("click", ".band-name-button", function(){

		$("#gifs").empty();
		var clickedButtonText = $(this).attr("data-type");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickedButtonText + "&api_key=dc6zaTOxFJmzC&limit=10";		console.log(queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response){

			var results = response.data;		

			for(var i = 0; i < results.length; i++) {

				var bandDiv = $("<div class='band-item'>");
				var rating = results[i].rating;
				var ratingParagraph = $("<p>").text("Rating is: " + rating);
				var animatedBandGif = results[i].images.fixed_height.url;
				var pausedBandGif = results[i].images.fixed_height_still.url;
				var bandImageElement = $("<img>");

				bandImageElement.attr("src", pausedBandGif);
		        bandImageElement.attr("data-still", pausedBandGif);
		        bandImageElement.attr("data-animate", animatedBandGif);
		        bandImageElement.attr("data-state", "still");
		        bandImageElement.addClass("bandImage");

		        bandDiv.append(ratingParagraph);
		        bandDiv.append(bandImageElement);

				$("#gifs").append(bandDiv);
			}
		})
	})

	$(document).on("click", ".bandImage", function() {

		if($(this).attr("data-state") === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}
		else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}

	})

});


//function makes the buttons to be added to the #bands div

function makeBandButtons(bandArray, bandButtonClass, divToPopulate){

	$(divToPopulate).empty();

	for (band in bandArray) {
		var bandButton = $("<button>");
		bandButton.addClass(bandButtonClass+" btn btn-primary" );
		bandButton.attr("data-type", bandArray[band]);
		bandButton.text(bandArray[band]);
		$(divToPopulate).append(bandButton);
	}
}

	



