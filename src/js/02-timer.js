import flatpickr from "flatpickr";
import Notiflix from "notiflix";

const datetimePicker = flatpickr("#datetime-picker", {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
    Notiflix.Notify.warning("Please choose a date in the future");
    } else {
    const startButton = document.querySelector("[data-start]");
    startButton.removeAttribute("disabled");
    }
},
});

const startButton = document.querySelector("[data-start]");
startButton.addEventListener("click", startTimer);

let countdownInterval;

function startTimer() {
const selectedDate = datetimePicker.selectedDates[0];
const currentTime = new Date();

if (selectedDate <= currentTime) {
    Notiflix.Notify.warning("Please choose a date in the future");
    return;
}

startButton.setAttribute("disabled", true);

clearInterval(countdownInterval);
countdownInterval = setInterval(updateTimer, 1000);
updateTimer();
};

function updateTimer() {
const selectedDate = datetimePicker.selectedDates[0];
const currentTime = new Date();
const remainingTime = selectedDate - currentTime;

if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    updateTimerDisplay("00", "00", "00", "00");
    Notiflix.Notify.success("Countdown timer has ended");
} else {
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    const formattedDays = addLeadingZero(days);
    const formattedHours = addLeadingZero(hours);
    const formattedMinutes = addLeadingZero(minutes);
    const formattedSeconds = addLeadingZero(seconds);

    updateTimerDisplay(formattedDays, formattedHours, formattedMinutes, formattedSeconds);
}
};

function convertMs(ms) {
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const days = Math.floor(ms / day);
const hours = Math.floor((ms % day) / hour);
const minutes = Math.floor(((ms % day) % hour) / minute);
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
return value.toString().padStart(2, "0");
};

function updateTimerDisplay(days, hours, minutes, seconds) {
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

daysElement.textContent = days;
hoursElement.textContent = hours;
minutesElement.textContent = minutes;
secondsElement.textContent = seconds;
};
