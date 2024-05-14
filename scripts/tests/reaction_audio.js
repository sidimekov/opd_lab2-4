import { sendData } from '../../scripts/data_manager.js';

let erika = new Audio("../../resources/Erika.mp3")

const button = document.getElementById('button');
const progress = document.getElementById('progress');
const results = document.getElementById('results');
const attempts = document.getElementById('attempts');
const restartButton = document.getElementById('restartButton');
const timer = document.getElementById('timer');
const progressBarText = document.getElementById("progressBarText");
let attemptsCount = 0;
let successes = 0;
let totalTime = 0;
let audio = erika;
let isAudioPlaying = false;

var timeoutId = -1;

function restartGame() {
    attemptsCount = 0;
    successes = 0;
    totalTime = 0;
    timer.innerHTML = "00:00";
    progressBarText.innerHTML = "0/15";
    progress.style.width = '0%';
    results.textContent = '';
    attempts.textContent = '';
    erika.pause();
    erika.currentTime = 10;
    isAudioPlaying = false;
    startAudio();
    startProgress();
    erika.pause;
    erika.currentTime = 10;
    isAudioPlaying = false;
}

document.getElementById("restartButton").addEventListener('click', restartGame);

function startProgress() {
    attemptsCount = 0;
    successes = 0;
    totalTime = 0;
    progress.style.width = '0%';
    const interval = setInterval(() => {
        progress.style.width = `${Math.min(100, (attemptsCount / 15) * 100)}%`;
        if (attemptsCount >= 15) {
            clearInterval(interval);
            button.removeEventListener('click', handleClick);
            button.style.backgroundColor = 'green';
            button.innerHTML = 'Тест пройден';
            if (successes > 4) {

                results.innerHTML = `Успешных попыток: ${successes}<br>Пропущенных попыток: ${attemptsCount - successes}<br>Среднее время успешных попыток: ${totalTime / successes}ms`;
                attempts.textContent = `Attempts: ${15}`;
                // расчёт оценок
                var reaction_time = totalTime / successes;
                var accuracy = successes;

                // отправка оценок на серв
                var formData = new FormData();
                // id тестов:
                // 1 - Тест на простые визуальные сигналы
                // 2 - Тест на простые звуковые сигналы
                // 3 - Тест на сложные цветные сигналы
                // 4 - Тест сложные цифровые визуальные сигналы
                // 5 - Тест на сложные цифровые звуковые сигналы
                formData.append('test_id', 2);
                formData.append('reaction_time', reaction_time);
                formData.append('accuracy', accuracy);
                formData.append('misses', 0);
                formData.append('mistakes', 0);
                var result = sendData(formData, '../../backend/requests/send_user_results.php');
                console.log(result.response);

            } else {
                results.innerHTML = results.innerHTML + "Результаты не могут быть записаны, т.к. успешных попыток должно быть хотя бы 5.<br> Попробуйте ещё раз";
            }
            erika.pause();
            erika.currentTime = 10;
            isAudioPlaying = false;
        }
    }, 1000);
}

function handleClick() {
    if (isAudioPlaying && attemptsCount < 15) {
        attemptsCount++;
        progressBarText.innerHTML = attemptsCount + "/15";
        successes++;
        totalTime += new Date() - startTime;
        timer.innerHTML = new Date() - startTime + "ms";
        erika.pause();
        erika.currentTime = 10;
        isAudioPlaying = false;
        startAudio();
    } else if (attemptsCount < 15) {
        attemptsCount++;
        progressBarText.innerHTML = attemptsCount + "/15";
    }
    clearTimeout(timeoutId);
}

function startAudio() {
    if (attemptsCount < 15) {
        const delay = Math.floor(Math.random() * 2000) + 1000; // Random delay between 1 and 3 seconds
        timeoutId = setTimeout(() => {
            erika.play();
            startTime = new Date();
            button.addEventListener('click', handleClick);
            isAudioPlaying = true;
        }, delay);
    }
}

function firstPress() {
    startAudio();
    startProgress();
    button.removeEventListener('click', firstPress);
    button.innerHTML = "Жми, когда услышишь звук";
    button.style.backgroundColor = "green";
}

attemptsCount = 0;
successes = 0;
totalTime = 0;
progress.style.width = '0%';

button.addEventListener('click', firstPress);

let startTime;