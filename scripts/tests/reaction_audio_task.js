import { sendData } from '../../scripts/data_manager.js';

const progressBarText = document.getElementById("progressBarText");
const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");
const timer = document.getElementById("timer");
const timerText = document.getElementById("timerText");
const buttonEven = document.getElementById('button-even');
const buttonOdd = document.getElementById('button-odd');
const restartButton = document.getElementById('restartButton');
let attemptsCount = 0;
let successes = 0;
let totalTime = 0;
let task;

var timeoutId = -1;

function startProgress() {
    attemptsCount = 0;
    successes = 0;
    totalTime = 0;
    progress.style.width = '0%';
    const interval = setInterval(() => {
        progress.style.width = `${Math.min(100, (attemptsCount / 15) * 100)}%`;
        if (attemptsCount >= 15) {
            clearInterval(interval);
            buttonEven.removeEventListener('click', handleAnswer);
            buttonOdd.removeEventListener('click', handleAnswer);
            
            
            if (successes > 4) {
                    
                timer.innerHTML = (totalTime/successes).toFixed(3)+" ms";
                timerText.innerHTML = "Среднее время успешных попыток"+ "<br>Удачных: " + successes + "<br>Пропущенных: " + (attemptsCount - successes);

                // расчёт оценок
                var reaction_time = totalTime / successes;
                var accuracy = successes;

                // отправка оценок на серв
                var formData = new FormData();

                formData.append('test_id', 5);
                formData.append('reaction_time', reaction_time);
                formData.append('accuracy', accuracy);
                formData.append('misses', 0);
                formData.append('mistakes', 15 - accuracy);
                var result = sendData(formData, '../../backend/requests/send_user_results.php');
                console.log(result.response);

            } else {
                timerText.innerHTML = "Результаты не могут быть записаны, т.к. успешных попыток должно быть хотя бы 5.<br> Попробуйте ещё раз";
            }

        }
    }, 1000);
}

function generateTask() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    let operator = '+';
    let spokenTask;
    spokenTask = `${num1} + ${num2}`;
    task = `${num1} ${operator} ${num2}`;
    // speak the task orally
    const speech = new SpeechSynthesisUtterance(spokenTask);
    speech.lang = 'ru-Ru'; // set the language to Russian
    window.speechSynthesis.speak(speech);
    const delay = 0; // Random delay between 2 and 3,5 seconds
    startTime = new Date();
    timeoutId = setTimeout(() => {
        if (!task) {
            generateTask();
        }
        buttonEven.addEventListener('click', handleAnswer);
        buttonOdd.addEventListener('click', handleAnswer);
    }, delay);
}

function handleAnswer(event) {
    if (attemptsCount < 15) {
        attemptsCount++;
        progressBarText.innerHTML = attemptsCount + "/15";
        const result = eval(task);
        if (event.target.id === 'button-even' && result % 2 === 0) {
            successes++;
            totalTime += new Date() - startTime;
            timer.innerHTML = (new Date() - startTime) + "ms";
            task = null;
            generateTask();
        } else if (event.target.id === 'button-odd' && result % 2 !== 0) {
            successes++;
            totalTime += new Date() - startTime;
            timer.innerHTML = (new Date() - startTime) + "ms";
            task = null;
            generateTask();
        } else {
            task = null;
            generateTask();
        }
        clearTimeout(timeoutId);
    }
}


function restartGame() {
    timer.innerHTML = "00:00";
    timerText.innerHTML = "Last successful attempt time"
    progressBarText.innerHTML = "0/15";
    attemptsCount = 0;
    successes = 0;
    totalTime = 0;
    progress.style.width = '0%';
    task = null;
    generateTask();
    startProgress();
}

let startTime;
generateTask();
startProgress();
restartButton.addEventListener('click', restartGame);