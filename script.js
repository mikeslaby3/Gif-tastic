$(document).ready(function() {
    
    var mascots = ['Phillie Phanatic', 'Brutus Buckeye', 'Gritty', 'Stuff the Magic Dragon', 'Bucky Badger'];

    function createButtonClickEvent() {
        $("button").on("click", function () {
            console.log("button clicked");
            var search = $(this).attr("search-data");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                search + "&api_key=Lo9F5cUkIX8VOvetla1A4HzUTJhFTWoz&limit=10&rating=PG&lang=en";
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    var results = response.data;
                    $('#gifs-appear-here').empty();
                    results.forEach(function (result) {
                        var gifDiv = $("<div>");
                        var rating = result.rating;
                        var title = result.title
                        var p = $("<p>").text(title + " | Rating: " + rating);
                        var currentImage = $("<img>");
                        currentImage.attr("src", result.images.fixed_height_still.url);
                        $(currentImage).click(function () {
                            if ($(this).attr('src') === result.images.fixed_height_still.url) {
                                $(this).attr('src', result.images.fixed_height.url);
                            }
                            else {
                                $(this).attr('src', result.images.fixed_height_still.url);
                            }
                        });
                        gifDiv.prepend(p);
                        gifDiv.prepend(currentImage);
                        $("#gifs-appear-here").prepend(gifDiv);
                    });
                });
        });
    }

    function createButtons() {

        $('#buttons').empty();

        mascots.forEach(function(mascot){
            var mascotButton = '<button search-data="' + mascot + '">' + mascot + '</button>';
            console.log(mascotButton);
            $('#buttons').append(mascotButton);
        });

        createButtonClickEvent();
    };

    createButtons();

    $("#add-mascot").on("click", function(event) {

        event.preventDefault();
        var mascotText = $('#mascot-input').val().trim();
        if (mascotText !== '') {
            mascots.push(mascotText);
            createButtons();
        }
    });

        

});
