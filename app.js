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

    let interval;
    let timeLeft = 1500;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
        const second = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${second}`;
    }


    function startTimer() {
        if (interval) return console.log
        interval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(interval);
                interval = null;
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


    bars.addEventListener("click", () => {
        SideBar.classList.toggle("hide");
        bars.classList.toggle("shift-left");
        main.classList.toggle("shifted");
    });

    const ModesMap = {
        PomodoroMode: "25:00",
        ShortBreak: "5:00",
        LongBreak: "10:00",
    }



    ModeButton.forEach(button => {
        button.addEventListener("click", () => {
            const key = button.classList[0];
            const timeString = ModesMap[key];
            const [minutes, seconds] = timeString.split(':').map(Number);
            timeLeft = minutes * 60 + seconds;

            Timer.textContent = formatTime(timeLeft);

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

    Restart.addEventListener("click", () => {
        pauseTimer();
        Timer.textContent = formatTime(timeLeft); // reset current mode time
        Play.style.display = "block";
        Pause.style.display = "none";
    });

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
});