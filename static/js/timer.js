(function () {

    const fehBody = document.body;
    const workDurationInput = document.getElementById("work-duration");
    const restDurationInput = document.getElementById("rest-duration");
    const timerTime = document.getElementById("feh-timer-time");
    const circleProgress = document.querySelector('.circle-progress');

    let workDuration = parseInt(workDurationInput.value) * 60;
    let restDuration = parseInt(restDurationInput.value) * 60;
    let remainingTime = workDuration;
    let isPaused = true;
    let isWorking = true;
    let intervalId;

    const completedSessionsElement = document.getElementById('feh-completed-sessions');
    let completedSessions = 0;

    window.addEventListener("load", () => {
        fehBody.classList.add('page-loaded'); // Load Pomodoro display
    })

    // Start button functionality
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => {
        isPaused = false;

        fehBody.classList.add('timer-running'); // Start timer

        // Remove and add all relevant styles for when timer is running
        if (isWorking) {
            fehBody.classList.remove('timer-paused');
        }
        else {
            fehBody.classList.add('rest-mode');
            fehBody.classList.remove('timer-paused');
        }

        if (!intervalId) {
            intervalId = setInterval(updateTimer, 1000);
        }
    });

    // Pause button functionality
    const pauseBtn = document.getElementById("pause-btn");
    pauseBtn.addEventListener("click", () => {
        isPaused = true;
        // Remove and add all relevant styles for when timer is paused
        fehBody.classList.remove('timer-running');
        fehBody.classList.add('timer-paused');

    });


    const btnToggleSettings = document.getElementById("feh-toggle-settings");
    const btnCloseSettings = document.getElementById("feh-close-settings");

    function setBodySettings() {
        fehBody.classList.contains('settings-active') ? fehBody.classList.remove('settings-active') : fehBody.classList.add('settings-active')
    }

    function toggleSettings() {
        // This function toggles setting display
        if (event.type === 'click') {
            setBodySettings();
        }
        else if (event.type === 'keydown' && event.keyCode === 27) {
            fehBody.classList.remove('settings-active');
        }
    }

    btnToggleSettings.addEventListener('click', toggleSettings);
    btnCloseSettings.addEventListener('click', toggleSettings);
    document.addEventListener('keydown', toggleSettings);


    workDurationInput.addEventListener("change", () => {
        //Update remaining time for work
        workDuration = parseInt(workDurationInput.value) * 60;
        if (isWorking) {
            remainingTime = workDuration;
            updateProgress();
        }
    });

    restDurationInput.addEventListener("change", () => {
        //Update remaining time for rest
        restDuration = parseInt(restDurationInput.value) * 60;
        if (!isWorking) {
            remainingTime = restDuration;
            updateProgress();
        }
    });


    function updateTimer() {
        //This function handles the switch from rest mode to work mode and vice versa
        let playAlarm;
        //Sounds played when rest and/or work is finished
        const workFinished = new Audio("/static/music/success-fanfare-trumpets-6185.mp3");
        const restFinished = new Audio("/static/music/error-when-entering-the-game-menu-132111.mp3");
        
        if (!isPaused) {

            remainingTime--;


            if (remainingTime <= 0) {
                //When there is no remaining time left
                isWorking = !isWorking;
                remainingTime = isWorking ? workDuration : restDuration;

                //Switch to rest mode if we are no longer working
                if (!isWorking) {
                    fehBody.classList.add('rest-mode');
                    fehBody.classList.remove('timer-running');

                    completedSessions++;
                    completedSessionsElement.textContent = completedSessions;
                }
                //Otherwise remove both rest and timer running (pause)
                else {
                    fehBody.classList.remove('rest-mode');
                    fehBody.classList.remove('timer-running');
                }
                playAlarm = isWorking ? restFinished : workFinished;
                playAlarm.play();

                isPaused = false;
                fehBody.classList.remove('timer-work-active');
            }
            document.title = timerTime.textContent = formatTime(remainingTime);
            updateProgress();

        }
    }

    function updateProgress() {
        // This function handles the display of the circle timer
        const radius = 45;
        const circumference = 2 * Math.PI * radius;

        const totalDuration = isWorking ? workDuration : restDuration;
        const dashOffset = circumference * remainingTime / totalDuration;

        circleProgress.style.strokeDashoffset = dashOffset;
        timerTime.textContent = formatTime(remainingTime);
    }

    function formatTime(seconds) {
        // This function handles the format of the time on the timer
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    // Now run this updateProgress function on load
    updateProgress();
})();
