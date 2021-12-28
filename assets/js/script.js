// Open weather map api
var requestUrl = "api.openweathermap.org/data/2.5/weather"
var apiKey = "ff6fc12478a0481bc7a2df1ec4864f2c";

// container for search text
var citySearchText = "";

// event listener for search button
$("#search-button").on("click", function() {
    var text = $("#city-search").val();
    if (!text) {
        return false;
    }
    else {
        citySearchText = text;
        currentWeather();
    }
});

function currentWeather() {
var currentWeatherReq = requestUrl + "?q=" + citySearchText + "&appid=" + apiKey;
console.log(currentWeatherReq);
// Name of City (date: 00/00/0000) icon
// temp
// wind speed
// humidity
// UV index (with color)
}