// Open weather map api
var requestUrl = "https://api.openweathermap.org/data/2.5/onecall"
var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct";
var apiKey = "ff6fc12478a0481bc7a2df1ec4864f2c";

var citySearchText = ""

// event listener for search button
$("#search-button").on("click", function() {
    var text = $("#city-search").val();
    if (!text) {
        return false;
    }
    else {
        citySearchText = text;
        getCoordinates(text);
    };
});

var getCoordinates = function(city) {
    // create api call
    var coordinatesReq = geocodeUrl + "?q=" + city + "&limit=1&appid=" + apiKey;
    fetch(coordinatesReq).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var cityLat = data[0].lat;
                var cityLon = data[0].lon;
                getCurrentWeather(cityLat, cityLon);
            })
        }
        else {
            alert("error: " + response.status); // currently not working?
        };
    });
};

var getCurrentWeather = function(lat, lon) {
    // call to one-call-api
    var currWeatherReq = requestUrl + "?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=" + apiKey;
    fetch(currWeatherReq).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                currentWeatherEls(data);
            })
        }
        else {
            alert("error: " + response.status); // doesn't work yet
        };
    });
};

var currentWeatherEls = function(data) {
    // specify data
    var cityName = citySearchText.charAt(0).toUpperCase() + citySearchText.slice(1); 
    var currentDate = "(" + dayjs().format("MM/DD/YYYY") + ") ";
    var weatherIcon = data.current.weather[0].icon;
    var iconAlt = data.current.weather[0].description
    var temp = data.current.temp;
    var humidity = data.current.humidity;
    var windSpeed = data.current.wind_speed;
    var uvi = data.current.uvi;
    // TODO: create a function to validate UV data


    // create parent el
    var divEl = $("<div>")
    .addClass("current-div container-fluid");

    // create elements to store retrieved data
    // city name
    var cityEl = $("<h2>")
    .addClass("city-name")
    .text(cityName + ": " + currentDate);
    //icon
    var iconEl = $("<img>")
    .attr({
        "src" : "https://openweathermap.org/img/w/" + weatherIcon + ".png",
        "alt" : iconAlt
    });
    // combine city name and icon
    cityEl.append(iconEl);
    // temp
    var tempEl = $("<p>")
    .addClass()
    .text("Temp: " + temp + "°F");
    // wind speed
    var windSpeedEl = $("<p>")
    .addClass()
    .text("Wind: " + windSpeed + "MPH");
    // humidity
    var humidityEl = $("<p>")
    .addClass()
    .text("Humidity: " + humidity + "%");
    // uv index
    var uviEl = $("<p>")
    .addClass()
    .text("UV Index: ");
    var uviButton = $("<button>")
    .attr("disabled", true)
    .addClass()
    .text(uvi)
    // combine uv index and button
    uviEl.append(uviButton);

    // append elements
    $(".current-weather-container").append(divEl);
    $(".current-div").append(cityEl, tempEl, windSpeedEl, humidityEl, uviEl);
}


// // creates current weather elements
// function createCurrentEls(data) {
//     // Name of City (date: 00/00/0000) icon
//     var cityName = data.name;
//     var currentTime = data.dt;
//     var currentIcon = data.weather[0].icon;
//     var title = document.createElement("h2");
//     title.textContent = cityName + ": (" + currentTime + ") ";
    
//     var icon = document.createElement("img");
//     var iconUrl = "https://openweathermap.org/img/w/" + currentIcon + ".png";
//     var iconAlt = data.weather[0].description;
//     icon.setAttribute("src", iconUrl);
//     icon.setAttribute("alt", iconAlt);
    
//     // temp
//     var currentTemp = data.main.temp;
//     var temp = document.createElement("p");
//     temp.textContent = "Temp: " + currentTemp + "°F";

//     // wind speed
//     var currentWind = data.wind.speed
//     var wind = document.createElement("p");
//     wind.textContent = "Wind: " + currentWind + " MPH"

//     // humidity
//     var currentHumidity = data.main.humidity;
//     var humidity = document.createElement("p");
//     humidity.textContent = "Humidity: " + currentHumidity + "%";

//     // UV index (with color)

//     // append
//     $(".current-weather").append(title);
//     title.append(icon);
//     $(".current-weather").append(temp);
//     $(".current-weather").append(wind);
// } 