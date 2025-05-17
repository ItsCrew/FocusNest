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


    bars.addEventListener("click", () => {
        SideBar.classList.toggle("hide");
        bars.classList.toggle("shift-left");
    });

    const ModesMap = {
        PomodoroMode: "Default",
        ShortBreak: "Short Break",
        LongBreak: "Long Break",
    }

    ModeButton.forEach(button => {
        button.addEventListener("click", () => {
            const key = button.classList[0];
            Timer.textContent = ModesMap[key];
        })
    });


    // Dark and Light mode logic
    // DarkMode.addEventListener("click", () => {
    //     LightModeDiv.style.display = "block"
    //     DarkModeDiv.style.display = "none"
    //     document.body.style.backgroundColor = "#1e2d24"
    //     document.body.style.color = "#ededed"
    //     SideBar.style.backgroundColor = "#2d3c33"
    //     // Navigation.style.backgroundColor = "#6b8f71"

    // })

    // LightMode.addEventListener("click", () => {
    //     LightModeDiv.style.display = "none"
    //     DarkModeDiv.style.display = "block"
    //     document.body.style.backgroundColor = "#f7f7f7"
    //     document.body.style.color = "#333333"
    //     SideBar.style.backgroundColor = "#91c788"
    //     // Navigation.style.backgroundColor = "#94bd9b"


    // 

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