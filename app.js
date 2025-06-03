document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

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

    let interval;
    let timeLeft = 1500;
    let Mode = "PomodoroMode";
    let Completion = 0

    // const ModesMap = {
    //     PomodoroMode: 25 * 60,
    //     ShortBreak: 5 * 60,
    //     LongBreak: 10 * 60
    // }

    const ModesMap = {
        PomodoroMode: 0.2 * 60,
        ShortBreak: 0.3 * 60,
        LongBreak: 0.1 * 60
    }

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
                    Mode = "ShortBreak";
                    CycleUpdater(Completion);
                } else if (Mode === "PomodoroMode" && Completion === 3) {
                    Completion = 0;
                    CycleUpdater(0);
                    Mode = "LongBreak"
                } else {
                    Mode = "PomodoroMode"
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
        timeLeft = ModesMap[Mode];
        Timer.textContent = formatTime(timeLeft);
        Play.style.display = "block";
        Pause.style.display = "none"
    }

    bars.addEventListener("click", () => {
        SideBar.classList.toggle("hide");
        bars.classList.toggle("shift-left");
        main.classList.toggle("shifted");
        localStorage.setItem("sidebar-state", SideBar.classList.contains("hide"));
    });

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
            Pause.style.display = "block"
            Play.style.display = "none"
            startTimer();
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