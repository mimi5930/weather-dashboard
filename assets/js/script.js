// Open weather map api
var apiKey = ff6fc12478a0481bc7a2df1ec4864f2c

// container for search text
var citySearchText = "";

// event listener for search button
$("#search-button").on("click", function() {
    var text = $("#city-search").val();
    if (!text) {
        console.log("no text");
    }
    else {
        console.log(text);
        citySearchText = text

    }
});

function currentWeather() {
// Name of City (date: 00/00/0000) icon
// temp
// wind speed
// humidity
// UV index (with color)
}