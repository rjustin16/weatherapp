    // This is our API key. Add your own API key between the ""
    $('button').on("click", function () {
        var APIKey = "2083ba99e548234fc6955819000762a8";
        var city = $("#city").val();
        // Here we are building the URL we need to query the database
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;
    
        // We then created an AJAX call
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
    
          // Create CODE HERE to Log the queryURL
          console.log(queryURL)
          // Create CODE HERE to log the resulting object
          console.log(response)
          // Create CODE HERE to calculate the temperature (converted from Kelvin)
          var F = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
          var C = Math.floor((response.main.temp - 273.15))
          var K = Math.floor(response.main.temp)
          // console.log(F);
          // Create CODE HERE to transfer content to HTML
          $(".city").text("City name: " + response.name);
          $(".wind").text("Wind speed: " + response.wind.speed);
          $('.humidity').text('Humidity:' + response.main.humidity);
          $('.temp').text('Temperature F: ' + F);
          $('.tempC').text("Temperature C: " + C);
          $('.tempK').text("Temperature K: " + K);
          $('.tempcontent').text('TempContent: ')
          var TempContent = response.main;
          Object.entries(TempContent);
          // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
          // Create CODE HERE to dump the temperature content into HTML
    
        });
      })