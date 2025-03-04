const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}
document.addEventListener('keydown', (event) => {
    if (event.key === 's') {
      document.getElementById('start-timer').click(); // Start timer
    }
    if (event.key === 'p') {
      document.getElementById('pause-timer').click(); // Pause timer
    }
    if (event.key === 't') {
      document.getElementById('tts-button').click(); // Start TTS
    }
    if (event.key === 'x') {
      document.getElementById('tts-stop').click(); // Stop TTS
    }
  });

  const weatherInfo = document.getElementById('weather-info');

function fetchWeather() {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const city = 'Banglore'; // Replace with user's location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      weatherInfo.innerHTML = `
        <p>Weather: ${weather}</p>
        <p>Temperature: ${temp}°C</p>
      `;
    })
    .catch((error) => {
      console.error('Error fetching weather:', error);
    });
}

fetchWeather();
// Google Calendar API integration
function addEventToCalendar(event) {
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
    });
  }