const moodButtons = document.querySelectorAll('.mood-options button');
const youtubePlayer = document.getElementById('youtube-player');
const songSuggestion = document.getElementById('song-suggestion');

const moodSongs = {
  happy: "https://www.youtube.com/embed/d-diB65scQU",
  sad: "https://www.youtube.com/embed/KG_P2VJqPzE",
  energetic: "https://www.youtube.com/embed/ZbZSe6N_BXs",
  calm: "https://www.youtube.com/embed/2Xc9gXyf2G4"
};

moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.getAttribute('data-mood');
    const songUrl = moodSongs[mood];
    if (songUrl) {
      youtubePlayer.innerHTML = `<iframe width="100%" height="315" src="${songUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      songSuggestion.style.display = "block";
    }
  });
});
