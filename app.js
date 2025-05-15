const bars = document.querySelector(".bars")
const SideBar = document.querySelector(".SideBar")
const DarkModeDiv = document.querySelector(".DarkModeDiv")
const DarkMode = document.querySelector(".DarkMode")
const LightModeDiv = document.querySelector(".LightModeDiv")
const LightMode = document.querySelector(".LightMode")

bars.addEventListener("click", () => {
    SideBar.classList.toggle("hide");
    bars.classList.toggle("shift-left");
});

// Dark and Light mode logic
DarkMode.addEventListener("click", () => {
    LightModeDiv.style.display = "block"
    DarkModeDiv.style.display = "none"
    document.body.style.backgroundColor = "#1e2d24"
    document.body.style.color = "#ededed"
    SideBar.style.backgroundColor = "#2d3c33"
})

LightMode.addEventListener("click", () => {
    LightModeDiv.style.display = "none"
    DarkModeDiv.style.display = "block"
    document.body.style.backgroundColor = "#f7f7f7"
    document.body.style.color = "#333333"
    SideBar.style.backgroundColor = "#91c788"

})