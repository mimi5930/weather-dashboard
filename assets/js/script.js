// Open weather map api
var requestUrl = "https://api.openweathermap.org/data/2.5/weather"
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
    // create an api call with input information
    var currentWeatherReq = requestUrl + "?q=" + citySearchText + "&appid=" + apiKey;
    fetch(currentWeatherReq).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                createCurrentEls(data);
            })
        }
        else {
            document.location.replace("./index.html");
        }
    })
    
}

function createCurrentEls(data) {
    // Name of City (date: 00/00/0000) icon
    // temp
    // wind speed
    // humidity
    // UV index (with color)

} 