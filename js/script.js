var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=-74.0060&appid=';
var ApiKey = '1cb4efda358c457a3432445aaf5c171b';
// var city = 'NewYork';
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + '&appid=' + ApiKey;
var searchbtn = $('#searchButton');
// var iconUrl = `https://openweathermap.org/img/w/${weatherData.iconCode}.png`;


var d = dayjs().format('MMMM D, YYYY');
console.log(d);

// Display current date
$(function () {
    var d = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(d);
})



$(function () {
    $.get(currentWeatherUrl + ApiKey, function (data) {
        // Process the API response data here
        console.log(data);
        console.log(data.city.coord.lat);
        console.log(data.city.coord.lon);
        // getWeatherData(data.latitude, data.longitude);
    }).fail(function (error) {
        // Handle any errors that occur during the request
        console.error(error);
    });
});


// getWeatherData(lat, lon) {
//     var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=f15b9497c6b6f8a664cbf171c926c169`;

// }











// function addWeatherData(weatherData) {
//     // Create a weather-data div 
//     var weatherDataDiv = $('<div>').addClass('weather-data bg-yellow tile is-child box');
//     // Construct the inner HTML of weather-data div
//     var iconUrl = `https://openweathermap.org/img/w/${weatherData.iconCode}.png`;
//     var weatherDataInfo = `
//           <h2 class="title">Weather at this trail</h2>
//           <div class="columns">
//             <div class="column mx-4">
//               <p>Temperature: ${weatherData.temperature}°F</p>
//               <p>Humidity: ${weatherData.humidity}</p>
//               <p>Wind Speed: ${weatherData.windSpeed} mph</p>
//             </div>
//             <div class="column mx-4">
//               <p>Feels Like: ${weatherData.feelsLike}°F<img src="${iconUrl}" alt="Weather Icon"></p>
//             </div>
//           </div>
//           `;

//     weatherDataDiv.append(weatherDataInfo);
// }


// function getWeatherData(lat, lon) {
//     var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=f15b9497c6b6f8a664cbf171c926c169`;

//     // Get all of the weather data for their location and put it in an object to be sent to addWeatherData()
//     $.get(apiUrl, function (data) {
//         var weatherData = {
//             temperature: Math.floor(data.main.temp),
//             humidity: data.main.humidity,
//             windSpeed: data.wind.speed,
//             iconCode: data.weather[0].icon
//         }

//         addWeatherData(weatherData);
//     });
// }





// https://api.openweathermap.org/data/2.5/appid=1cb4efda358c457a3432445aaf5c171b

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1cb4efda358c457a3432445aaf5c171b')