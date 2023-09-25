var weatherApi = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1cb4efda358c457a3432445aaf5c171b';

fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1cb4efda358c457a3432445aaf5c171b')

https://api.openweathermap.org/data/2.5/appid=1cb4efda358c457a3432445aaf5c171b







fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m")
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
