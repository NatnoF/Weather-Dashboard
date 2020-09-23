// Global Variables
var currentCityEl = $("<h2>");
var currentTempEl = $("<p>");
var currentHumidityEl = $("<p>");
var currentWindEl = $("<p>");
var uvIndexEl = $("<p>");
var currentImage = $("<img>");

var forecastDivEl = $("<div>");
var forecastCardEl = $("<div>");
var forecastDateEl = $("<h5>");
var forecastImageEl = $("<img>");
var forecastTempEl = $("<p>");
var forecastHumidityEl = $("<p>");

var forecastDiv = $("#forecast");
var currentWeatherDiv = $("#currentWeather");

//Setting up the elements to have the appropriate classes for styling
forecastDivEl.addClass("card text-white bg-primary mb-3 mr-4");
forecastDivEl.css("max-width", "10rem");
forecastCardEl.addClass("card-body");
forecastDateEl.addClass("card-title");
forecastTempEl.addClass("card-text");
forecastHumidityEl.addClass("card-text");


$(document).ready(function ()
{
    $("#weather-btn").on("click", function(event)
    {
        event.preventDefault();
        
        var cityInput = $("#weather-input").val().trim();
        currentWeather(cityInput);
        forecast(cityInput);
    });

    function currentWeather(city)
    {
        $.ajax(
        {
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=a0770a518a887ec5aa5cb207e7a24651"
        }).then(function(data)
        {
            console.log(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            uvIndex(lat,lon);

            currentCityEl.text(data.name + " (" + moment().format("MM/DD/YYYY") + ")");
            currentTempEl.text("Temperature: " + data.main.temp + " \u00B0F");
            currentHumidityEl.text("Humidity: " + data.main.humidity + "%");
            currentWindEl.text("Wind Speed: " + data.wind.speed + " MPH");

            currentCityEl.append($("<img>",{src:"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"}));

            currentWeatherDiv.append(currentCityEl, currentTempEl, currentHumidityEl, currentWindEl);

        })
    }

    function forecast(city)
    {
        $.ajax(
        {
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=a0770a518a887ec5aa5cb207e7a24651"
        }).then(function(data)
        {
            console.log(data);
        })
    }

    function uvIndex(lat, lon)
    {
        $.ajax(
        {
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=a0770a518a887ec5aa5cb207e7a24651"
        }).then(function(data)
        {
            console.log(data);
            var uv = data.value;
        })
    }
});