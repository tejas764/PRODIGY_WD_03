// script.js

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    startTime = 0;
    updateTime();
    laps = [];
    renderLaps();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function recordLap() {
    if (elapsedTime !== 0) {
        laps.push(elapsedTime);
        renderLaps();
    }
}

function renderLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsContainer.appendChild(lapElement);
    });
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
