const apiKey = '400a3fdf016663de2adba17c5519c7b4'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const weatherDetails = document.getElementById('weatherDetails');
    const errorMessage = document.getElementById('errorMessage');

    if (!city) {
        errorMessage.textContent = "Please enter a city name!";
        errorMessage.classList.remove('hidden');
        weatherDetails.classList.add('hidden');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        errorMessage.classList.add('hidden');
        weatherDetails.classList.remove('hidden');

        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temperature').textContent = `${data.main.temp} °C`;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('windSpeed').textContent = data.wind.speed;

        const weatherIcon = document.getElementById('weatherIcon');
        const weatherDesc = document.getElementById('weatherDescription');
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherDesc.textContent = data.weather[0].description;

        updateBackground(data.weather[0].main);
    } catch (error) {
        errorMessage.textContent = `Error: ${error.message}`;
        errorMessage.classList.remove('hidden');
        weatherDetails.classList.add('hidden');
    }
}

function updateBackground(weatherCondition) {
    const weatherBg = {
        Clear: 'clear.png',
        Clouds: 'cloudy.png',
        Rain: 'rainy.png',
        Snow: 'snowy.png',
        Thunderstorm: 'thunderstorm.png',
        Drizzle: 'drizzle.png',
        Mist: 'mist.png'
    };

    document.body.style.background = `url('${weatherBg[weatherCondition] || 'org.png'}')`;
}

document.getElementById('toggleTemp').addEventListener('click', function () {
    const tempElement = document.getElementById('temperature');
    let temp = parseFloat(tempElement.textContent);
    
    if (this.textContent === '°C') {
        temp = (temp * 9/5) + 32;
        tempElement.textContent = `${temp.toFixed(1)} °F`;
        this.textContent = '°F';
    } else {
        temp = (temp - 32) * 5/9;
        tempElement.textContent = `${temp.toFixed(1)} °C`;
        this.textContent = '°C';
    }
});
