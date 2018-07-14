//getting ready
$("document").ready(function () {
    
    //gif variables
    var topics = "";
    var topicArray = ["pusheen", "grumpy cat", "simon's cat"];
    var buttonGrp = $(".buttons");
    var gifGrp = $(".gifs");
    var getGifTopic = "";
    var searchLimit = 10;


//initial function for rendering on screen - later to be used with local storage
function initialButtons() {
    for (var i = 0; i < topicArray.length; i++) {
        var gifButton = $("<button>");

        ///rendering initial buttons
        gifButton.text(topicArray[i]);
        gifButton.attr("data-topic",topicArray[i]);
        buttonGrp.prepend(gifButton);
    }
};

initialButtons();

//captures input and pushes it to topicArray
$("#button-input").on("click", function(event) {
    event.preventDefault();
    console.log("You hit submit!");

    var newTopic = $("#topic-input").val().trim();
    console.log(newTopic);

    if (newTopic != false) {
    topicArray.push(newTopic);
    console.table(topicArray);

    var gifButton = $("<button>");

    gifButton.text(newTopic);
    gifButton.attr("data-topic", newTopic);
    buttonGrp.prepend(gifButton);

    $("#topic-input").val("");
    }

});

$("#reset-gifs").on("click", function(event) {
    gifGrp.empty();
});

var apiKey = "uflagFLSB25wcN4mYash1C2FRr84RVQU";
var sampleURL = "https://api.giphy.com/v1/gifs/search?api_key=uflagFLSB25wcN4mYash1C2FRr84RVQU&q=&limit=25&offset=0&rating=G&lang=en"
var queryURL = "";

function getGifs() {
    //searchURL
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key="
                + apiKey
                + "&q="
                + getGifTopic
                + "&limit="
                + searchLimit
                + "&offset=0&lang=en";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(results);

            for (let i = 0; i < results.length; i++) {

                //getting data from the api
                var staticURL = results[i].images.fixed_height_still.url;
                console.log("is this the problem? " + staticURL);
                var gifURL = "https://media1.giphy.com/media/" + results[i].id + "/200.gif";
                console.log(gifURL);
                var rating = "rating: " + results[i].rating;
                console.log(rating);

                //creating DOM elements
                var gifBlock = $("<div>").addClass("gifBlock");
                var gifImage = $("<img>");
                var gifRating = $("<p>");
                var downloadBtn =$('<a href="'
                                + gifURL
                                + '" class="download-button" target="_blank" download="'
                                + gifURL
                                +'">').text("download");
                
                //saving in case I break everything var downloadBtn = $("<a download>").addClass("download-button");

                //saving work in case this breaksdownloadBtn.attr("href", results[i].images.fixed_height.url).attr("target", "_blank").text("download");

                //adding image assets to gif Image
                gifImage.attr("data-still", staticURL);
                gifImage.attr("data-animate", gifURL);
                gifImage.attr("data-state", "still");
                gifImage.attr("src", staticURL);
                gifImage.addClass("gifImage");

                //adding text content to rating
                gifRating.text(rating);
                gifRating.addClass("gifRating");

                gifBlock.append(downloadBtn);
                gifBlock.append(gifImage);
                gifBlock.append(gifRating);
                

                gifGrp.prepend(gifBlock);

            }

        });

};


//on click of button grabs 10 static gif images and displays with rating
$(document.body).on("click", "button", function() {
    getGifTopic = $(this).attr("data-topic");
    gifGrp.empty();
    getGifs();
});

//gif animatess onclick
$(document.body).on("click", ".gifImage", function() {
    var state = $(this).attr("data-state");

    //if still,
    if(state === "still") {
        //use the data-animate value as the src value to get it to display the animated gif
       $(this).attr("src", $(this).attr("data-animate"));
       //change the data-state to animate so that it knows to stop it on the next click
       $(this).attr("data-state", "animate");
       console.log(state);
     } else {
        //the reverse of what was above
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
     }
});



//additional click appends 10 more



//one-click download

//create a persistent "favorite gifs"


});

















// function displayGif () {

//     var gifTopic = $(this).data("name");
//     var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=uflagFLSB25wcN4mYash1C2FRr84RVQU&q=" + gifTopic + "&limit=25&offset=0&rating=G&lang=en";

//     //create AJAX call for which movie button is selected
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {
//         console.log(queryURL);
//         console.log(response);

//     //create a div to hold the movie
//         var gifHolder = $("<div>");
//         gifHolder.attr('id', 'gifContainer');
    
//     //create an element to hold the image
//     console.log(response.gif);

//     var selectedGif = "https://media.giphy.com/media/" + response.data.id + "/giphy.gif";
//     $("#gifDisplay").html('<img src="'+ selectedGif +'" width="100%"/>');
//       });

// };