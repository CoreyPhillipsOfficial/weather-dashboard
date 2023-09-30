const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '1cb4efda358c457a3432445aaf5c171b';
const weatherDisplay = $('#currentWeather');
let d;


$(document).ready(function () {
    $('.form-group').on('click', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
    });
    $('#searchButton').on('click', function () {
        const cityInput = $('#cityInput');
        let cityName = cityInput.val();
        console.log(cityName);
        getCurrentWeather(cityName);
    });

    // Get current date
    const d = dayjs().format('mm/DD/YYYY');
    $('#currentDay').text(d);

    // Get current weather
    function getCurrentWeather(city) {
        if (!city || city === '') {
            return;
        }
        const url = `${baseUrl}weather?q=${city}&appid=${apiKey}`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayCurrentWeather(data);
                getForecast(data.coord.lat, data.coord.lon);
                console.log(data);
            })
            .catch(function (error) {
                alert(error)
            })
    }

    function displayCurrentWeather(currentData) {
        if (!currentData.main) {
            return;
        }

        // Convert wind speed to miles/hour
        const windSpeedMph = currentData.wind && currentData.wind.speed ? currentData.wind.speed * 2.237 : 0;
        const tempFahrenheit = (currentData.main.temp - 273.15) * 9 / 5 + 32;


        // Display the current weather data
        weatherDisplay.html(`
        <section class="border" id="currentWeather">
          <h1>${currentData.name} (${d}) <img src="http://openweathermap.org/img/w/${currentData.weather[0].icon}.png" alt="Weather Icon"></h1>
          <p>Temp: ${tempFahrenheit.toFixed(2)}°F</p>
          <p>Wind: ${windSpeedMph.toFixed(2)}mph</p>
          <p>Humidity: ${currentData.main.humidity}%</p>
        </section>
        `);
    }

    function getForecast(lat, lon) {
        // Check if lat and lon are defined
        if (!lat || !lon) {
            return;
        }

        // Get the forecast data
        const url = `${baseUrl}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayForecast(data);
                console.log(data);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function displayForecast() {
        // Display the forecast data

    }

});


// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
