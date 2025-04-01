async function getWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location!');
        return;
    }
    const apiKey = 'ca86a2c9f6a64c30b72103014250104';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        document.getElementById('weather-info').innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Condition: ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}" alt="Weather icon">
        `;
        changeBackground(data.current.condition.text.toLowerCase());
    } catch (error) {
        document.getElementById('weather-info').innerHTML = '<p>Could not fetch weather data. Please check the location and try again.</p>';
    }
}
function changeBackground(condition) {
    console.log('Weather condition:', condition); // Log the condition
    const bgIcon = document.querySelector('.bg-icon');
    bgIcon.classList.remove('rain', 'clouds', 'sun', 'snow', 'default');
    if (condition.includes('rain')) {
        console.log('Changing background to rainy'); // Log change
        document.body.style.background = "linear-gradient(90deg, rgba(0,2,84,1) 12%, rgba(151,213,255,1) 89%)";
        bgIcon.classList.add('rain')
    } else if (condition.includes('cloud') || condition.includes('mist')) {
        console.log('Changing background to cloudy');
        document.body.style.background = "linear-gradient(90deg, rgba(38,39,73,1) 12%, rgba(114,140,157,1) 89%)";
        bgIcon.classList.add('clouds')
    } else if (condition.includes('sunny') || condition.includes('clear')) {
        console.log('Changing background to sunny');
        document.body.style.background = "linear-gradient(90deg, rgba(255,156,0,1) 12%, rgba(255,251,151,1) 89%)";
        bgIcon.classList.add('sun')
    } else if (condition.includes('snow')) {
        console.log('Changing background to snowy');
        document.body.style.background = "linear-gradient(90deg, rgba(69,149,161,1) 12%, rgba(255,255,255,1) 89%)";
        bgIcon.classList.add('snow')
    } else {
        console.log('Changing background to default');
        document.body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)"; // Default gradient
        bgIcon.classList.add('default')
    }
}
