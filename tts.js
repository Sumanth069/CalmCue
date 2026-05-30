const ttsInput = document.getElementById('tts-input');
const ttsButton = document.getElementById('tts-button');
const ttsStop = document.getElementById('tts-stop');
const speedInput = document.getElementById('speed');
const pitchInput = document.getElementById('pitch');
const languageSelect = document.getElementById('language');
const fileInput = document.getElementById('file-input');
let speech = new SpeechSynthesisUtterance();
let voices = [];
let isPaused = false;
let pausedCharIndex = 0;


function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  languageSelect.innerHTML = voices
    .map((voice, i) => `<option value="${i}">${voice.name} (${voice.lang})</option>`)
    .join('');
}


function setVoice() {
  speech.voice = voices[languageSelect.value];
}


function readText() {
  if (ttsInput.value.trim() === '') {
    alert('Please enter some text or upload a file.');
    return;
  }

  window.speechSynthesis.cancel(); 

  if (isPaused) {
    speech.text = ttsInput.value.slice(pausedCharIndex);
  } else {
    speech.text = ttsInput.value;
    pausedCharIndex = 0;
  }

  speech.rate = speedInput.value;
  speech.pitch = pitchInput.value;

  window.speechSynthesis.speak(speech);
  isPaused = false;
}


speech.onboundary = (event) => {
  const text = ttsInput.value;
  pausedCharIndex = event.charIndex;

  let before = text.substring(0, pausedCharIndex);
  let after = text.substring(pausedCharIndex);
  let match = after.match(/\S+/); 

  if (match) {
    let currentWord = match[0];
    let rest = after.substring(match.index + currentWord.length);
    document.getElementById('highlighted-text').innerHTML = `
      ${before}<span style="background-color: yellow;">${currentWord}</span>${rest}
    `;
  }
};

// Stop reading and reset highlight
function stopReading() {
  window.speechSynthesis.cancel();
  isPaused = true;
  document.getElementById('highlighted-text').innerHTML = ttsInput.value; // Remove highlight
}

speech.onend = () => {
  isPaused = false;
  pausedCharIndex = 0;
};

// Handle file upload
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type === 'application/pdf') {
      extractTextFromPDF(file);
    } else if (file.type === 'text/plain') {
      extractTextFromTXT(file);
    } else {
      alert('Unsupported file type. Please upload a .txt or .pdf file.');
    }
  }
});

// Extract text from a .txt file
function extractTextFromTXT(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    ttsInput.value = e.target.result;
  };
  reader.readAsText(file);
}

// Extract text from a .pdf file
async function extractTextFromPDF(file) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const pdfData = new Uint8Array(e.target.result);
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(' ');
    }
    ttsInput.value = text;
  };
  reader.readAsArrayBuffer(file);
}

// Event listeners
ttsButton.addEventListener('click', readText);
ttsStop.addEventListener('click', stopReading);
speedInput.addEventListener('input', () => {
  speech.rate = speedInput.value;
  document.getElementById('speed-value').textContent = speedInput.value;
});
pitchInput.addEventListener('input', () => {
  speech.pitch = pitchInput.value;
  document.getElementById('pitch-value').textContent = pitchInput.value;
});
languageSelect.addEventListener('change', setVoice);

// Load voices when the page loads
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();
