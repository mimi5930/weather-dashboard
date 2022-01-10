// Open weather map api
var requestUrl = "https://api.openweathermap.org/data/2.5/onecall";
var geocodeUrl = "https://api.openweathermap.org/geo/1.0/direct";
var apiKey = "ff6fc12478a0481bc7a2df1ec4864f2c";

var citySearchText = "";
var searchHistory = [];
var buttonExists = false;
var buttonClicked = false;


// INPUT ENTERED

var inputEntered = function() {
    var text = $("#city-search").val();
    if (!text) {
        return false;
    }
    checkChildren();
    citySearchText = text;
    getCoordinates(text);
};

// API CALLS

var getCoordinates = function(city) {
    // create api call
    var coordinatesReq = geocodeUrl + "?q=" + city + "&limit=1&appid=" + apiKey;
    fetch(coordinatesReq).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var cityLat = data[0].lat;
                var cityLon = data[0].lon;
                saveCoord(cityLat, cityLon);
                getCurrentWeather(cityLat, cityLon);
            })
        }
        else {
            alert("Error: " + response.statusText);
        };
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeatherMap");
    });
};

var getCurrentWeather = function(lat, lon) {
    // call to one-call-api
    var currWeatherReq = requestUrl + "?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    fetch(currWeatherReq).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                currentWeatherEls(data);
            })
        }
        else {
            alert("error: " + response.statusText);
        };
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeatherMap");
    })
};

// SAVE AND RETRIEVE DATA FROM LOCAL STORAGE

var loadSearchHistory = function() {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (!searchHistory) {
        searchHistory = [];
        return;
    };

    $.each(searchHistory, function(i) {
        // create varialbes to store relevant info
        var name = searchHistory[i].name;
        var lat = searchHistory[i].latitude;
        var lon = searchHistory[i].longitude;

        // create elements with current values
        createSearchEls(name, lat, lon);
        
    })
}

var createSearchEls = function(name, lat, lon) {
    // create elements to store data
    var searchEl = $("<button>")
    .addClass("search-button btn btn-secondary mb-2")
    .attr("id", "prev-search")
    .text(name)
    .attr("data-lat", lat)
    .attr("data-lon", lon);

    $(".history-container").append(searchEl);
}

var saveCoord = function(lat, lon) {
    var search = {
        name: citySearchText,
        latitude: lat,
        longitude: lon
    };
    // validate if information already exists in the element
    for (i = 0; i < searchHistory.length; i++) {
        if (searchHistory[i].name.toLowerCase() === search.name.toLowerCase()) {
            buttonExists = true;
            return;
        }
    }
    searchHistory.push(search);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// CREATE ELEMENTS

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
    var lat = data.lat;
    var lon = data.lon;


    // create parent el
    var divEl = $("<div>")
    .addClass("current-div p-4");

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
    .addClass(function() {
        if (uvi >= 0 && uvi < 3) {
            return "bg-success";
        }
        else if (uvi >= 3 && uvi < 8) {
            return "bg-warning";
        }
        else {
            return "bg-danger";
        }
    })
    .text(uvi)
    // combine uv index and button
    uviEl.append(uviButton);
    
    // append elements
    $(".weather-container").append(divEl);
    $(".current-div").append(cityEl, tempEl, windSpeedEl, humidityEl, uviEl);

    //create cards for forcast
    forecastEls(data);

    // add recent search buttons if it doesn't already exist
    if (buttonClicked) {
        buttonClicked = false;
        return;
    }
    else if (buttonExists) {
        buttonExists = false;
        return;
    }
    else {
    }
    createSearchEls(citySearchText, lat, lon);
}

var forecastEls = function(data) {
    // create header
    var header = $("<h2>")
    .addClass("forecast-header mt-4 text-center")
    .text("5-Day Forecast:")
    // append to div
    $(".weather-container").append(header);

    // create div container to hold forecast
    var divEl = $("<div>")
    .addClass("forecast-div d-flex flex-md-row flex-column justify-content-md-around mt-4");
    // append div to section
    $(".weather-container").append(divEl)

    // create elements based on data
    for (var i = 1; i < 6; i++) {
        // create card to hold data
        var card = $("<div>")
        .addClass("card p-1 m-1");

        // create card body
        var cardBody = $("<div>")
        .addClass("card-body");

        // date
        var date = dayjs().add([i], "day").format("MM/DD/YYYY");
        var dateEl = $("<h3>")
        .addClass("card-title")
        .text(date);
        // icon
        var icon = data.daily[i].weather[0].icon;
        var iconAlt = data.daily[i].weather[0].description;
        var iconEl = $("<img>")
        .addClass("card-subtitle")
        .attr({
            "src" : "https://openweathermap.org/img/w/" + icon + ".png",
            "alt" : iconAlt
        });
        // temp
        var temp = data.daily[i].temp.day;
        var tempEl = $("<p>")
        .addClass("card-text")
        .text("Temp: " + temp + "°F");
        // wind
        var wind = data.daily[i].wind_speed;
        var windEl = $("<p>")
        .addClass("card-text")
        .text("Wind: " + wind + " MPH");
        // humidity
        var humidity = data.daily[i].humidity;
        var humidityEl = $("<p>")
        .addClass("card-text")
        .text("Humidity: " + humidity + "%");

        // append elements
        $(".forecast-div").append(card);
        $(".card:last-child").append(cardBody);
        $(".card-body:last").append(dateEl, iconEl, tempEl, windEl, humidityEl);
    }
}

var checkChildren = function () {
    if ($(".current-div").length) {
        $(".current-div").remove();
    };
    if ($(".forecast-header").length) {
        $(".forecast-header").remove();
        $(".forecast-div").remove();
    };
}

// EVENT LISTENERS

// load files
$(document).ready(loadSearchHistory());

// event listener for search button
$("#search-button").on("click", function() {
    inputEntered();
});

// event listener for enter key pressed
$("#city-search").keypress(function(e) {
    if (e.which == 13) {
        inputEntered();
    }
})

// event listener for previous searches
$(".history-container").on("click", "button", function() {
    // define lat and lon
    var name = $(this).text();
    var lat = $(this).attr("data-lat");
    var lon = $(this).attr("data-lon");
    buttonClicked = true;
    
    // update city name
    citySearchText = name;
    
    // delete child elements
    checkChildren();

    //input vals into api call
    getCurrentWeather(lat, lon);
})