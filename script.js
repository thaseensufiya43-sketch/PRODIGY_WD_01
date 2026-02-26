const apiKey = "64b4ef5595b541daaa9247851e138df9";

// Search weather by city
function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

// Weather using current location
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Fetch and display weather
function fetchWeather(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("weather-result").innerHTML = `<p>City not found ❌</p>`;
                return;
            }

            document.getElementById("weather-result").innerHTML = `
                <h3>${data.name}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            `;
        })
        .catch(() => {
            document.getElementById("weather-result").innerHTML = `<p>Error fetching data</p>`;
        });
}