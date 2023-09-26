var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1cb4efda358c457a3432445aaf5c171b';
var currentWeatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m';
var ApiKey = '1cb4efda358c457a3432445aaf5c171b';
// var searchButton = document.
var city = 'NewYork';
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey;




fetch(currentWeatherUrl + ApiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Process the API response data here
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occur during the request
        console.error(error);
    });


function addWeatherData(weatherData) {
    // Create a weather-data div 
    var weatherDataDiv = $('<div>').addClass('weather-data bg-yellow tile is-child box');
    // Construct the inner HTML of weather-data div
    var iconUrl = `https://openweathermap.org/img/w/${weatherData.iconCode}.png`;
    var weatherDataInfo = `
          <h2 class="title">Weather at this trail</h2>
          <div class="columns">
            <div class="column mx-4">
              <p>Temperature: ${weatherData.temperature}°F</p>
              <p>Humidity: ${weatherData.humidity}</p>
              <p>Wind Speed: ${weatherData.windSpeed} mph</p>
            </div>
            <div class="column mx-4">
              <p>Feels Like: ${weatherData.feelsLike}°F<img src="${iconUrl}" alt="Weather Icon"></p>
            </div>
          </div>
          `;

    weatherDataDiv.append(weatherDataInfo);
    modalDetails.append(weatherDataDiv);
}


function getWeatherData(lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=f15b9497c6b6f8a664cbf171c926c169`;

    // Get all of the weather data for their location and put it in an object to be sent to addWeatherData()
    $.get(apiUrl, function (data) {
        var weatherData = {
            temperature: Math.floor(data.main.temp),
            humidity: data.main.humidity,
            feelsLike: Math.floor(data.main.feels_like),
            windSpeed: data.wind.speed,
            condition: data.weather[0].description,
            iconCode: data.weather[0].icon
        }

        addWeatherData(weatherData);
    });
}





// https://api.openweathermap.org/data/2.5/appid=1cb4efda358c457a3432445aaf5c171b

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1cb4efda358c457a3432445aaf5c171b')