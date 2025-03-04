const moodButtons = document.querySelectorAll('.mood-options button');
const youtubePlayer = document.getElementById('youtube-player');

const moodSongs = {
  happy: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example: "Never Gonna Give You Up"
  sad: "https://www.youtube.com/embed/hT_nvWreIhg", // Example: "Someone Like You"
  energetic: "https://www.youtube.com/embed/kXYiU_JCYtU", // Example: "Uptown Funk"
  calm: "https://www.youtube.com/embed/7maJOI3QMu0", // Example: "Weightless"
};

moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.getAttribute('data-mood');
    const songUrl = moodSongs[mood];
    youtubePlayer.innerHTML = `<iframe width="100%" height="315" src="${songUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
});