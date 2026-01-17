document.addEventListener("DOMContentLoaded", () => {
    const PomodoroMode = document.querySelector(".PomodoroMode")
    const ShortBreak = document.querySelector(".ShortBreak")
    const LongBreak = document.querySelector(".LongBreak")
    const Timer = document.querySelector(".Timer")
    const ModeButton = document.querySelectorAll(".ModeButton")
    const Play = document.querySelector(".PlayButton")
    const Pause = document.querySelector(".PauseButton")
    const Restart = document.querySelector(".RestartButton")
    const Done = document.querySelector(".alarm-sound")

    // Timer Logic

    const defaultTime = {
        PomodoroMode: 25,
        ShortBreak: 5,
        LongBreak: 10
    }

    const ModesMap = {
        PomodoroMode: (parseInt(localStorage.getItem("PomodoroMode")) || defaultTime.PomodoroMode) * 60,
        ShortBreak: (parseInt(localStorage.getItem("ShortBreak")) || defaultTime.ShortBreak) * 60,
        LongBreak: (parseInt(localStorage.getItem("LongBreak")) || defaultTime.LongBreak) * 60
    }

    let interval;
    let timeLeft = (parseInt(localStorage.getItem("PomodoroMode")) || defaultTime.PomodoroMode) * 60;
    let Mode = "PomodoroMode";
    let Completion = 0

    if (Timer) {
        Timer.textContent = formatTime(timeLeft);
    }



    // const ModesMap = {
    //     PomodoroMode: 0.2 * 60,
    //     ShortBreak: 0.3 * 60,
    //     LongBreak: 0.1 * 60
    // }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
        const second = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${second}`;
    }



    function startTimer() {
        if (interval) return;
        interval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(interval);
                interval = null;
                console.log(Completion)

                if (Mode === "PomodoroMode" && Completion < 3) {
                    Completion++;
                    TimerCompletionNotification();
                    Mode = "ShortBreak";
                    CompletionSound();
                    CycleUpdater(Completion);
                } else if (Mode === "PomodoroMode" && Completion === 3) {
                    TimerCompletionNotification();
                    Completion = 0;
                    CycleUpdater(0);
                    Mode = "LongBreak"
                    CompletionSound();
                } else {
                    TimerCompletionNotification();
                    Mode = "PomodoroMode"
                    CompletionSound();
                }

                [PomodoroMode, ShortBreak, LongBreak].forEach(btn => {
                    btn.classList.remove("mode-active");
                });
                document.querySelector(`.${Mode}`).classList.add("mode-active");

                timeLeft = ModesMap[Mode];
                Timer.textContent = formatTime(timeLeft);
                Play.style.display = "none";
                Pause.style.display = "block";
                startTimer();
                return;
            }
            timeLeft--;
            Timer.textContent = formatTime(timeLeft);
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(interval);
        interval = null;
    }

    function RestartTimer() {
        pauseTimer();
        Completion = 0;
        CycleUpdater(0);
        timeLeft = ModesMap[Mode];
        Timer.textContent = formatTime(timeLeft);
        Play.style.display = "block";
        Pause.style.display = "none"
    }


    function CycleUpdater(count) {
        const wrappers = document.querySelectorAll('.CycleWrapper');

        wrappers.forEach((wrapper, index) => {
            const emptyCircle = wrapper.querySelector('.Circle');
            const filledCircle = wrapper.querySelector('.FilledCircle');

            if (index < count) {
                filledCircle.style.opacity = "1";
                emptyCircle.style.opacity = "0";
            } else {
                filledCircle.style.opacity = "0";
                emptyCircle.style.opacity = "1";
            }
        });
    }

    function CompletionSound() {
        Done.play();
    }




    ModeButton.forEach(button => {
        button.addEventListener("click", () => {
            const key = button.classList[0];
            Mode = key;
            timeLeft = ModesMap[key];
            Timer.textContent = formatTime(timeLeft);

            ModeButton.forEach(btn => btn.classList.remove("mode-active"));
            button.classList.add("mode-active");

            pauseTimer();
            Play.style.display = "block";
            Pause.style.display = "none";
        });
    });

    if (Play) {
        Play.addEventListener("click", () => {
            Pause.style.display = "block";
            Play.style.display = "none";
            document.querySelector(`.${Mode}`).classList.add("mode-active");
            startTimer();

            // if (Notification.permission === "denied" && localStorage.getItem("isChecked") === "false") {
            //     alert("Hey there, If you want better Experience. Consider Enabling Notifications.")
            // }
            // Need to add a popup which will only come once and not spam to annoy users. It will tell the users to enable notifications for a better experience
        })
    }


    if (Pause) {
        Pause.addEventListener("click", () => {
            Pause.style.display = "none"
            Play.style.display = "block"
            pauseTimer();
        })
    }
    if (Restart) {

        Restart.addEventListener("click", () => {
            RestartTimer();
        });
    }


    function TimerCompletionNotification() {
        if (Notification.permission !== "granted" || localStorage.getItem("isChecked") !== "true") return;

        const DeepWorkTime = localStorage.getItem("PomodoroMode")

        const NotificationsData = {
            PomodoroMode: {
                title: "Break Time! ☕",
                body: `You worked for ${DeepWorkTime} minutes. Time to relax a bit.`,
            },
            ShortBreak: {
                title: "Break Over! ⏱️",
                body: `Hope you're refreshed. Get ready for ${DeepWorkTime} minutes of focus.`,
            },
            LongBreak: {
                title: "Long Break Done! 🚀",
                body: `Back to grind! Next session: ${DeepWorkTime} minutes.`,
            }
        };
        const { title, body } = NotificationsData[Mode] || {
            title: "Timer Done!",
            body: "Session completed.",
        };

        console.log(Mode)

        new Notification(title, {
            body,
            silent: true,
            // icon: "/path/to/icon.png" 
        });
    }
})