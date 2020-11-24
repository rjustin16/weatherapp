$("#search-btn").on("click", function () {
  var APIKey = "2083ba99e548234fc6955819000762a8";
  var city = $("#city").val();
  
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    let longitude = response.coord.lon;
    let latitude = response.coord.lat;
    function getUVindex() {
      let queryURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=37f10959e63cca1227d7847c5a47a2eb&lat=' + latitude + '&lon=' + longitude;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (data) {
        let currentUV = $("<p>").text('UV Index: ' + data.value);
        $("#current-weather").prepend(currentUV);
      });
    }
    console.log(queryURL);
    console.log(response);
    var F = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
    const $weatherdiv = $("<div>");
    const $wind = $("<p>").text("Wind speed: " + response.wind.speed);
    const $humidity = $("<p>").text("Humidity:" + response.main.humidity);
    const $temp = $("<p>").text("Temperature F: " + F);
     $("#current-weather").empty();
    $($weatherdiv).append($wind, $humidity, $temp, getUVindex());
    $("#current-weather").prepend($weatherdiv);
  });
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=imperial&APPID=${APIKey}`;
$.ajax({
    url: forecastURL,
    method: "GET"
}).then(function (response) {
    let array = [];
    for (let i = 0; i < response.list.length; i +=9) {
        array.push(response.list[i]);
        $("#fiveday-forecast").empty();
        $.each(array, function (i, forecast) {
          
            const $fivediv = $('<div>').attr('class', 'card p-2 text-white bg-primary');
            const $fivedate = $("<h3>").text(new Date(forecast.dt * 1000).toLocaleDateString("en-US"));
            const $fivetemp = $("<p>").text("Temp: " + forecast.main.temp);
            const $fiveicon = $(`<img src="https://api.openweathermap.org/img/w/${forecast.weather[0].icon}.png"/>`)
            const $fivehumid = $("<p>").text("Humidity: " + forecast.main.humidity + '%');
            $fivediv.append($fivedate, $fivetemp, $fiveicon, $fivehumid);
            $("#fiveday-forecast").append($fivediv);
        });
    };

})
});
$("#btn-wrapper").on("click", function (e) {
    e.preventDefault();
  });

