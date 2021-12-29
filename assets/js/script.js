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
    var currentWeatherReq = requestUrl + "?q=" + citySearchText + "&units=imperial&appid=" + apiKey;
    fetch(currentWeatherReq).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                createCurrentEls(data);
            })
        }
        else {
            alert("error: check to see if city name is spelled correctly!");
            document.location.replace("./index.html");
        }
    })
    
}

// creates current weather elements
function createCurrentEls(data) {
    // Name of City (date: 00/00/0000) icon
    var cityName = data.name;
    var currentTime = data.dt;
    var currentIcon = data.weather[0].icon;
    var title = document.createElement("h2");
    title.textContent = cityName + ": (" + currentTime + ") ";
    
    var icon = document.createElement("img");
    var iconUrl = "https://openweathermap.org/img/w/" + currentIcon + ".png";
    var iconAlt = data.weather[0].description;
    icon.setAttribute("src", iconUrl);
    icon.setAttribute("alt", iconAlt);
    
    // temp
    var currentTemp = data.main.temp;
    console.log(currentTemp);
    // wind speed
    // humidity
    // UV index (with color)

    // append
    $(".current-weather").append(title);
    title.append(icon);
} 