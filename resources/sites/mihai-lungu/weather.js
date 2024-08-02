document.getElementById('city').addEventListener('input', function () {
    var city = this.value;
    getWeather(city);
});

function getCityByIP() {
    const url = 'https://ipinfo.io/json?token=bd985d37445d24'; // Replace with your ipinfo.io token

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = data.city;
            document.querySelector('.location').innerHTML = city;
            document.getElementById('city').value = city;
            getWeather(city);
        })
        .catch(error => console.error('Error fetching IP info:', error));
}

getCityByIP();

async function getWeather() {
    try {
        var city = document.getElementById('city').value;
        console.log('City:', city);

        const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=89343885b9482657af7cf879ab377f06&units=metric`);
        const currentData = await currentResponse.json();

        // Actualizarea vremii curente
        document.querySelector('.weather-temp').textContent = Math.round(currentData.main.temp) + 'ºC';
        document.querySelector('.weather-desc').textContent = currentData.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        document.querySelector('.humidity .value').textContent = currentData.main.humidity + ' %';
        document.querySelector('.wind .value').textContent = currentData.wind.speed + ' m/s';
        document.querySelector('.weather-icon').innerHTML = getWeatherIcon(currentData.weather[0].icon);

        const currentDate = new Date();
        document.querySelector('.date-dayname').textContent = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        document.querySelector('.date-day').textContent = currentDate.toDateString().slice(4, 15);
        document.querySelector('.location').textContent = currentData.name;

        // Obținerea prognozei pentru următoarele zile
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=89343885b9482657af7cf879ab377f06&units=metric`);
        const forecastData = await forecastResponse.json();

        const dailyForecast = {};

        forecastData.list.forEach((data) => {
            const date = new Date(data.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });

            if (!dailyForecast[day]) {
                dailyForecast[day] = {
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    icon: data.weather[0].icon
                };
            } else {
                dailyForecast[day].minTemp = Math.min(dailyForecast[day].minTemp, data.main.temp_min);
                dailyForecast[day].maxTemp = Math.max(dailyForecast[day].maxTemp, data.main.temp_max);
            }
        });

        const dayElements = document.querySelectorAll('.forecast-day');
        const forecastDays = Object.keys(dailyForecast).slice(1, 5); // Exclude ziua curentă

        dayElements.forEach((dayElement, index) => {
            if (forecastDays[index]) {
                const day = forecastDays[index];
                const data = dailyForecast[day];
                dayElement.querySelector('.day-name').textContent = day;
                dayElement.querySelector('.day-temp').textContent = `${Math.round(data.minTemp)}º / ${Math.round(data.maxTemp)}º`;
                dayElement.querySelector('.day-icon').innerHTML = getWeatherIcon(data.icon);
            }
        });

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}
function getWeatherIcon(iconCode) {
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconSize = '@2x.png';
    return `<img src="${iconBaseUrl}${iconCode}${iconSize}" alt="Weather Icon">`;
}

document.addEventListener("DOMContentLoaded", function () {
    getWeather();
    setInterval(getWeather, 900000); // Update every 15 minutes
});
