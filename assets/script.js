$(document).ready(function() {
    var userInput = "austin"
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=807697c8abaab370e791d61bef0eb5b3";
    
    var apiKey = "&api-key=807697c8abaab370e791d61bef0eb5b3"
    var lat
    var lon 
    console.log(queryUrl)
  
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        lat = response.coord.lat
        lon = response.coord.lon
        queryUrl = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=807697c8abaab370e791d61bef0eb5b3&lat=" + lat + "&lon=" + lon
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            console.log(response[0].value)
        })
    })
});