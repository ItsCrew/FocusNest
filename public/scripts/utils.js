// Shared utility functions used across multiple pages

// Authentication check - expose globally for use in other modules
window.ensureAuthenticated = async function () {
    return true;
    // const isAuthenticated = await checkAuth();
    // if (!isAuthenticated) {
    //     window.location.href = '/Signup';
    //     return false;
    // }
    // return true;
}

// Sidebar initialization
function initializeSidebar() {
    const bars = document.querySelector(".bars");
    const SideBar = document.querySelector(".SideBar");
    const main = document.querySelector(".MainPageContent");

    if (!bars || !SideBar || !main) return;

    bars.addEventListener("click", () => {
        SideBar.classList.toggle("hide");
        bars.classList.toggle("shift-left");
        bars.classList.toggle("cross");
        main.classList.toggle("shifted");
        localStorage.setItem("sidebar-state", SideBar.classList.contains("hide"));
    });

    // Restore sidebar state on page load
    if (localStorage.getItem("sidebar-state") === "true") {
        SideBar.classList.add("hide");
        bars.classList.add("shift-left");
        bars.classList.add("cross");
        main.classList.add("shifted");
    }
}

// Theme toggle buttons initialization
function initializeThemeButtons() {
    const savedTheme = localStorage.getItem("theme");
    const DarkModeDiv = document.querySelector(".DarkModeDiv");
    const DarkMode = document.querySelector(".DarkMode");
    const LightModeDiv = document.querySelector(".LightModeDiv");
    const LightMode = document.querySelector(".LightMode");
    const SelectedTheme = document.querySelector(".SelectedTheme");

    if (!DarkMode || !LightMode) return;

    DarkMode.addEventListener("click", () => {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
        if (LightModeDiv) LightModeDiv.style.display = "block";
        if (DarkModeDiv) DarkModeDiv.style.display = "none";
        if (SelectedTheme) {
            SelectedTheme.innerHTML = `Dark Mode <i class="fa-solid fa-angle-down arrow"></i>`;
        }
    });

    LightMode.addEventListener("click", () => {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
        localStorage.setItem("theme", "light");
        if (LightModeDiv) LightModeDiv.style.display = "none";
        if (DarkModeDiv) DarkModeDiv.style.display = "block";
        if (SelectedTheme) {
            SelectedTheme.innerHTML = `Light Mode<i class="fa-solid fa-angle-down arrow"></i>`;
        }
    });

    // Set initial theme button visibility
    if (savedTheme === "light") {
        if (LightModeDiv) LightModeDiv.style.display = "none";
        if (DarkModeDiv) DarkModeDiv.style.display = "block";
    } else {
        if (LightModeDiv) LightModeDiv.style.display = "block";
        if (DarkModeDiv) DarkModeDiv.style.display = "none";
    }
}

// Initialize shared functionality on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    initializeSidebar();
    initializeThemeButtons();
});
