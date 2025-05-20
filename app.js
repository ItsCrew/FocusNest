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
            Timer.textContent = ModesMap[key];
        })
    });

    if (Play) {
        Play.addEventListener("click", () => {
            Pause.style.display = "block"
            Play.style.display = "none"
        })
    }

    if (Pause) {
        Pause.addEventListener("click", () => {
            Pause.style.display = "none"
            Play.style.display = "block"
        })
    }

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