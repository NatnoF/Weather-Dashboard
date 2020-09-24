// Global Variables
var currentCityEl = $("<h2>");
var currentTempEl = $("<p>");
var currentHumidityEl = $("<p>");
var currentWindEl = $("<p>");
var uvIndexEl = $("<p>");
var uvButtonEl = $("<button>");
var currentImage = $("<img>");

var forecastDiv = $("#forecast");
var currentWeatherDiv = $("#currentWeather");

uvButtonEl.attr("type", "button");
uvButtonEl.attr("disabled", true);
uvButtonEl.attr("id", "uv");


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
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            uvIndex(lat,lon);

            currentCityEl.text(data.name + " (" + moment().format("MM/DD/YYYY") + ")");
            currentTempEl.text("Temperature: " + data.main.temp + " \u00B0F");
            currentHumidityEl.text("Humidity: " + data.main.humidity + "%");
            currentWindEl.text("Wind Speed: " + data.wind.speed + " MPH");
            uvIndexEl.text("UV Index: ");

            currentCityEl.append($("<img>",{src:"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"}));

            currentWeatherDiv.append(currentCityEl, currentTempEl, currentHumidityEl, currentWindEl, uvIndexEl);

        })
    }

    function forecast(city)
    {
        forecastDiv.text("");
        $.ajax(
        {
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=a0770a518a887ec5aa5cb207e7a24651"
        }).then(function(data)
        {
            for (i = 0; i < data.list.length; i++)
            {
                if (data.list[i].dt_txt.indexOf("12:00:00") != -1)
                {
                    // Creating forecast card elements
                    var forecastDivEl = $("<div>");
                    var forecastCardEl = $("<div>");
                    var forecastDateEl = $("<h5>");
                    var forecastImageEl = $("<p>");
                    var forecastTempEl = $("<p>");
                    var forecastHumidityEl = $("<p>");

                    // Setting up the elements to have the appropriate classes for styling
                    forecastDivEl.addClass("card text-white bg-primary mb-3 mr-4");
                    forecastDivEl.css("max-width", "10rem");
                    forecastCardEl.addClass("card-body");
                    forecastDateEl.addClass("card-title");
                    forecastImageEl.addClass("card-text");
                    forecastTempEl.addClass("card-text");
                    forecastHumidityEl.addClass("card-text");

                    // Creating the content for the cards
                    var date = new Date(data.list[i].dt * 1000);
                    forecastDateEl.text(date.toLocaleDateString('en-US'));
                    forecastImageEl.append($("<img>",{src:"http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"}));
                    forecastTempEl.text("Temperature: " + data.list[i].main.temp + " \u00B0F");
                    forecastHumidityEl.text("Humidity: " + data.list[i].main.humidity + "%");

                    // Appending the cards to the page
                    forecastCardEl.append(forecastDateEl, forecastImageEl, forecastTempEl, forecastHumidityEl);
                    forecastDivEl.append(forecastCardEl);
                    forecastDiv.append(forecastDivEl);
                }
            }
        })
    }

    function uvIndex(lat, lon)
    {
        $.ajax(
        {
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=a0770a518a887ec5aa5cb207e7a24651"
        }).then(function(data)
        {
            uvButtonEl.text(data.value)

            // Decision making for what color to make the UV index indicator
            if (data.value >= 8)
            {
                uvButtonEl.attr("style", "background-color: rgb(220, 53, 69);");
            }
            else if (data.value >= 3)
            {
                uvButtonEl.attr("style", "background-color: rgb(236, 135, 41);");
            }
            else
            {
                uvButtonEl.attr("style", "background-color: rgb(37, 216, 46);");
            }

            uvIndexEl.append(uvButtonEl);
        })
    }
});