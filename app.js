document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const TimeInputs = document.querySelectorAll(".PomodoroTimeInput")
    const PomododoModeSlider = document.querySelector(".PomododoModeSlider")
    const BrowserNotificationsSlider = document.querySelector(".BrowserNotificationsSlider")

    const defaultValues = {
        PomodoroMode: 25,
        ShortBreak: 5,
        LongBreak: 10
    };

    if (PomododoModeSlider) {
        PomododoModeSlider.checked = localStorage.getItem("CheckBox") === "true";
    }

    if (BrowserNotificationsSlider) {
        BrowserNotificationsSlider.checked = localStorage.getItem("isChecked") === "true";
    }

    if (BrowserNotificationsSlider) {
        BrowserNotificationsSlider.addEventListener("change", () => {
            const isCheckedNotifications = BrowserNotificationsSlider.checked;
            localStorage.setItem("isChecked", isCheckedNotifications);
        })
    }

    if (PomododoModeSlider) {
        PomodoroModeChange();
    }

    if (PomododoModeSlider) {
        PomododoModeSlider.addEventListener("change", () => {
            const isChecked = PomododoModeSlider.checked;
            localStorage.setItem("CheckBox", isChecked);
            PomodoroModeChange();
        })
    }

    const bars = document.querySelector(".bars")
    const SideBar = document.querySelector(".SideBar")
    const DarkModeDiv = document.querySelector(".DarkModeDiv")
    const DarkMode = document.querySelector(".DarkMode")
    const LightModeDiv = document.querySelector(".LightModeDiv")
    const LightMode = document.querySelector(".LightMode")
    const PomodoroMode = document.querySelector(".PomodoroMode")
    const ShortBreak = document.querySelector(".ShortBreak")
    const LongBreak = document.querySelector(".LongBreak")
    const Timer = document.querySelector(".Timer")
    const ModeButton = document.querySelectorAll(".ModeButton")
    const Navigation = document.querySelector(".Navigation")
    const Play = document.querySelector(".PlayButton")
    const Pause = document.querySelector(".PauseButton")
    const main = document.querySelector(".MainPageContent");
    const Restart = document.querySelector(".RestartButton")
    const Settings = document.querySelector(".SettingsButton")
    const FilledCircle = document.querySelectorAll(".FilledCircle")
    const Circle = document.querySelectorAll(".Circle")
    const Done = document.querySelector(".alarm-sound")

    // All Pages Side Bar Logic

    bars.addEventListener("click", () => {
        SideBar.classList.toggle("hide");
        bars.classList.toggle("shift-left");
        main.classList.toggle("shifted");
        localStorage.setItem("sidebar-state", SideBar.classList.contains("hide"));
    });

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
        FilledCircle.forEach((icon, index) => {
            Circle.forEach((icon, index) => {
                icon.style.opacity = index < count ? "0" : "1";
                icon.style.display = index < count ? "none" : "Block";
            })
            icon.style.opacity = index < count ? "1" : "0";
            icon.style.display = index < count ? "block" : "none";
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

    function PomodoroModeChange() {
        TimeInputs.forEach(input => {
            const type = input.dataset.type;
            const saved = localStorage.getItem(type);

            if (PomododoModeSlider.checked) {
                input.value = defaultValues[type]
                localStorage.setItem(type, defaultValues[type]);
                input.disabled = true;
            } else {
                input.disabled = false;

                if (saved !== null) {
                    input.value = saved;
                } else {
                    input.value = defaultValues[type];
                    localStorage.setItem(type, defaultValues[type]);
                }

                if (!input.dataset.listenerAdded) {
                    input.addEventListener("blur", () => {
                        let minutes = parseInt(input.value);
                        if (isNaN(minutes) || minutes < 1) minutes = 1;
                        if (minutes > 360) minutes = 60;
                        input.value = minutes;
                        localStorage.setItem(type, minutes);
                    });
                    input.dataset.listenerAdded = true;
                }
            }
        });
    }


    if (BrowserNotificationsSlider) {
        BrowserNotificationsSlider.addEventListener("change", () => {
            if (Notification.permission === "default") {
                Notification.requestPermission().then(permission => {
                    console.log(permission)
                    if (Notification.permission == "granted") {
                        BrowserNotificationsSlider.checked = true;
                        localStorage.setItem("isChecked", true)
                    }
                })
            } else {
                console.log(Notification.permission)
            }
            if (Notification.permission !== "granted" || localStorage.getItem("isChecked") === "false") {
                console.log("Please Make sure to enable permission by going to the website settings")
                BrowserNotificationsSlider.checked = false;
                localStorage.setItem("isChecked", false)
            }
        });
    }

    function TimerCompletionNotification() {
        if (Notification.permission !== "granted" || localStorage.getItem("isChecked") !== "true") return;

        const DeepWorkTime = localStorage.getItem("PomodoroMode")
        const ShortBreakTime = localStorage.getItem("ShortBreak")
        const LongBreakTime = localStorage.getItem("LongBreak")

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

    // Light Mode Switch

    DarkMode.addEventListener("click", () => {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
        LightModeDiv.style.display = "block";
        DarkModeDiv.style.display = "none";
    });

    LightMode.addEventListener("click", () => {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
        localStorage.setItem("theme", "light");
        LightModeDiv.style.display = "none";
        DarkModeDiv.style.display = "block";
    });

    if (savedTheme === "light") {
        LightModeDiv.style.display = "none";
        DarkModeDiv.style.display = "block";
    } else {
        LightModeDiv.style.display = "block";
        DarkModeDiv.style.display = "none";
    }

    if (localStorage.getItem("sidebar-state") === "true") {
        SideBar.classList.add("hide");
        bars.classList.add("shift-left");
        main.classList.add("shifted");
    }
});