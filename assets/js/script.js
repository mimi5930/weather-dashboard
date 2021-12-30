// Open weather map api
var requestUrl = "https://api.openweathermap.org/data/2.5/weather"
var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct";
var apiKey = "ff6fc12478a0481bc7a2df1ec4864f2c";


// event listener for search button
$("#search-button").on("click", function() {
    var text = $("#city-search").val();
    if (!text) {
        return false;
    }
    else {
        citySearchText = text;
        getCoordinates(text);
    }
});

var getCoordinates = function(city) {
    // create api call
    var coordinatesReq = geocodeUrl + "?q=" + city + "&limit=1&appid=" + apiKey;
    console.log(coordinatesReq);
    fetch(coordinatesReq).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var cityLat = data[0].lat;
                var cityLon = data[0].lon;
                console.log(cityLat);
                console.log(cityLon);
            })
        }
        else {
            alert("error: " + response.status);
        };
    });
};

// function currentWeather() {
//     // create an api call with input information
//     var currentWeatherReq = requestUrl + "?q=" + citySearchText + "&units=imperial&appid=" + apiKey;
//     fetch(currentWeatherReq).then(function(response) {
//         if (response.ok) {
//             response.json().then(function(data) {
//                 createCurrentEls(data);
//             })
//         }
//         else {
//             alert("error: check to see if city name is spelled correctly!");
//             document.location.replace("./index.html");
//         }
//     })
    
// }

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