let timer;
let timeLeft = 0;
let isFocusTime = true;
let isRunning = false;
let roundsCompleted = 0;
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const stopButton = document.getElementById('stop-timer');
const resetButton = document.getElementById('reset-timer');
const focusTimeInput = document.getElementById('focus-time');
const breakTimeInput = document.getElementById('break-time');
const progressBar = document.getElementById('progress');
const roundsDisplay = document.getElementById('rounds');
const alarmSound = new Audio('assets/alarm.mp3');

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  updateProgressBar();
}

function updateProgressBar() {
  const totalTime = isFocusTime ? focusTimeInput.value * 60 : breakTimeInput.value * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  progressBar.style.width = `${progress}%`;
}

function startTimer() {
  if (!isRunning) {
    if (timeLeft === 0) {
      timeLeft = isFocusTime ? focusTimeInput.value * 60 : breakTimeInput.value * 60;
    }
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        clearInterval(timer);
        alarmSound.play();
        if (isFocusTime) {
          roundsCompleted++;
          roundsDisplay.textContent = `Rounds Completed: ${roundsCompleted}`;
        }
        isFocusTime = !isFocusTime;
        timeLeft = isFocusTime ? focusTimeInput.value * 60 : breakTimeInput.value * 60;
        updateTimer();
        startTimer();
      }
    }, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 0;
  updateTimer();
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = focusTimeInput.value * 60;
  isFocusTime = true;
  isRunning = false;
  roundsCompleted = 0;
  roundsDisplay.textContent = `Rounds Completed: ${roundsCompleted}`;
  updateTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize timer
resetTimer();