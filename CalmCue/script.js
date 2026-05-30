const darkModeToggle = document.getElementById('dark-mode-toggle');

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Safe keyboard shortcuts
document.addEventListener('keydown', (event) => {
  if (event.key === 's') {
    const btn = document.getElementById('start-timer');
    if (btn) btn.click();
  }
  if (event.key === 'p') {
    const btn = document.getElementById('pause-timer');
    if (btn) btn.click();
  }
  if (event.key === 't') {
    const btn = document.getElementById('tts-button');
    if (btn) btn.click();
  }
  if (event.key === 'x') {
    const btn = document.getElementById('tts-stop');
    if (btn) btn.click();
  }
});

const weatherInfo = document.getElementById('weather-info');

function fetchWeather() {
  if (!weatherInfo) return;
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const city = 'Banglore'; // Replace with user's location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
    console.log("Weather widget is waiting for a valid OpenWeatherMap API key.");
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.weather && data.main) {
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        weatherInfo.innerHTML = `
          <p>Weather: ${weather}</p>
          <p>Temperature: ${temp}°C</p>
        `;
      }
    })
    .catch((error) => {
      console.error('Error fetching weather:', error);
    });
}

fetchWeather();

// Google Calendar API integration
function addEventToCalendar(event) {
  if (typeof gapi === 'undefined' || !gapi.client || !gapi.client.calendar) {
    console.log("Google Calendar API is not loaded yet.");
    return;
  }
  const calendarId = 'primary';
  const eventDetails = {
    summary: event.title,
    start: {
      dateTime: event.startTime,
      timeZone: 'UTC',
    },
    end: {
      dateTime: event.endTime,
      timeZone: 'UTC',
    },
  };

  gapi.client.calendar.events.insert({
    calendarId,
    resource: eventDetails,
  }).then((response) => {
    console.log('Event added:', response);
  }).catch((err) => {
    console.error('Error adding event:', err);
  });
}