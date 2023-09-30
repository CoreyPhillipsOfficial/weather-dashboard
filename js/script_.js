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
    const d = dayjs().format('MM/DD/YYYY');
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

                // Retrieve existing list of searched cities from local storage
                const storedCities = JSON.parse(localStorage.getItem('storedCities')) || [];

                // Add searched city to array in local storage
                storedCities.push(city);

                // Store updated array in local storage
                localStorage.setItem('storedCities', JSON.stringify(storedCities));
            })
            .catch(function (error) {
                alert(error)
            })
    }

    function displayCurrentWeather(currentData) {
        if (!currentData.main) {
            return;
        }

        // Convert wind speed to miles/hour and temp to Farenheit
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

    function displayForecast(forecastData) {
        if (!forecastData.list) {
            return;
        }

        // Loop over forecast data
        forecastData.list.forEach(function (forecast, index) {
            // Skip current day's forecast
            if (index === 0) {
                return;
            }

            // Get date and time of forecast
            const forecastDate = dayjs(forecast.dt_txt);

            //Get forecast at noon each day
            if (forecastDate.hour() === 12) {
                //Get index for corresponding <span>
                const spanIndex = Math.floor(index / 8) + 1;

                // Target specific elements within each <span>
                const forecastDay = $(`#day-${spanIndex}`);
                const dateEl = forecastDay.find(`#dateplus${spanIndex}`);
                const iconEl = forecastDay.find(`#day-${spanIndex}-img`);
                const tempEl = forecastDay.find(`#temp-${spanIndex}`);
                const windEl = forecastDay.find(`#wind-${spanIndex}`);
                const humidityEl = forecastDay.find(`#humidity-${spanIndex}`);

                //Format date
                const formattedDate = forecastDate.format('MM/DD/YYYY');

                // Convert wind speed to miles/hour and temp to Farenheit
                const windSpeedMph = forecast.wind.speed * 2.237;
                const tempFarenheit = (forecast.main.temp - 273.15) * 9 / 5 + 32;


                //Display forecast
                dateEl.text(formattedDate);
                iconEl.html(`<img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather Icon">`);
                tempEl.text(`${tempFarenheit.toFixed(2)}°F`);
                windEl.text(`${windSpeedMph.toFixed(2)}mph`);
                humidityEl.text(`${forecast.main.humidity}%`);
            }

        });
    }
    // Display search history buttons
    function displaySearchHistory() {
        const storedCities = JSON.parse(localStorage.getItem('storedCities')) || [];
        const searchHistory = $('#searchHistory');

        searchHistory.empty();

        storedCities.forEach(function (city) {
            const button = $('<button>').addClass('btn btn-secondary btn-sm mb-2').text(city);
            button.on('click', function () {
                getCurrentWeather(city); // Trigger search for the clicked city
            });

            searchHistory.append(button); // Add the button to the search history div
        });
    }

    // Call the displaySearchHistory function on page load
    displaySearchHistory();


});


// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
