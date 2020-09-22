// Global Variables


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