const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resumeButton = document.getElementById('resume');
const calculateButton = document.getElementById('calculate');
const meetingCost = document.getElementById('meetingCost');
const resetButton = document.getElementById('reset');
const timeHours = document.getElementById('hours');
const timeMinutes = document.getElementById('minutes');

let timerInterval;
let totalSeconds = 0;
let isRunning = false;
let isUsingTimer = false;

const wageRates = {
    senior: 11.718, 
    deputy: 4.687,
    directors: 1.758,
    deputyDirectors: 1.118,
    staff: 0.614,
};

function updateTimerFromInput() {
    const hours = parseInt(timeHours.value) || 0;
    const minutes = parseInt(timeMinutes.value) || 0;
    totalSeconds = hours * 3600 + minutes * 60;
    updateTimer();
}

timeHours.addEventListener('input', updateTimerFromInput);
timeMinutes.addEventListener('input', updateTimerFromInput);

function updateTimer() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    timer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        timerInterval = setInterval(() => {
            totalSeconds++;
            updateTimer();
        }, 1000);
        isRunning = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        resumeButton.disabled = true;
        isUsingTimer = true;
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    resumeButton.disabled = false;
});

resumeButton.addEventListener('click', () => {
    if (!isRunning) {
        timerInterval = setInterval(() => {
            totalSeconds++;
            updateTimer();
        }, 1000);
        isRunning = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        resumeButton.disabled = true;
        isUsingTimer = true;
    }
});

calculateButton.addEventListener('click', () => {
    if (isRunning) {
        alert("Please stop the timer before calculating the cost.");
        return;
    }

    const senior = Math.max(0, parseFloat(document.getElementById('senior').value));
    const deputy = Math.max(0, parseFloat(document.getElementById('deputy').value));
    const directors = Math.max(0, parseFloat(document.getElementById('directors').value));
    const deputyDirectors = Math.max(0, parseFloat(document.getElementById('deputyDirectors').value));
    const staff = Math.max(0, parseFloat(document.getElementById('staff').value));

    let totalCost;

    if (isUsingTimer) {
        totalCost = (senior * wageRates.senior +
            deputy * wageRates.deputy +
            directors * wageRates.directors +
            deputyDirectors * wageRates.deputyDirectors +
            staff * wageRates.staff) * totalSeconds / 60;
    } else {
        totalCost = (senior * wageRates.senior +
            deputy * wageRates.deputy +
            directors * wageRates.directors +
            deputyDirectors * wageRates.deputyDirectors +
            staff * wageRates.staff) * totalSeconds / 60;
    }

    meetingCost.textContent = `Meeting Cost: $${totalCost.toFixed(2)}`;

    resetButton.style.display = 'block';
});

resetButton.addEventListener('click', () => {
    // Clear input fields
    document.getElementById('senior').value = 0;
    document.getElementById('deputy').value = 0;
    document.getElementById('directors').value = 0;
    document.getElementById('deputyDirectors').value = 0;
    document.getElementById('staff').value = 0;
    document.getElementById('hours').value = 0;
    document.getElementById('minutes').value = 0;

    // Reset the timer
    clearInterval(timerInterval);
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    resumeButton.disabled = false;
    totalSeconds = 0;
    updateTimer(); // Update the timer display to show 00:00:00

    resetButton.style.display = 'none';

    meetingCost.textContent = '';
});
