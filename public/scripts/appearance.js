document.addEventListener("DOMContentLoaded", () => {
    const DarkModeDiv = document.querySelector(".DarkModeDiv")
    const LightModeDiv = document.querySelector(".LightModeDiv")
    const ThemeSwitcher = document.querySelector(".ThemeSwitcher")
    const ThemeOptions = document.querySelectorAll(".ThemeOption")
    const SelectedTheme = document.querySelector(".SelectedTheme")
    const DropDownToggle = document.querySelector(".DropDownToggle")
    const BackgroundSwitcher = document.querySelector(".BackgroundSwitcher")
    const BackgroundOptions = document.querySelectorAll(".BackgroundOption")
    const SelectedBackgroundOption = document.querySelector(".SelectedBackgroundOption")
    const BackgroundDropDownToggle = document.querySelector(".BackgroundDropDownToggle")
    const ColorPicker = document.getElementById("ColorPicker");
    const OpenColorPickerButton = document.querySelector(".OpenColorPickerButton");
    const AddGradientBackground = document.querySelector(".AddGradientBackground")
    const GradientClose = document.querySelector(".GradientClose")
    const applyCustomGradient = document.querySelector(".applyCustomGradient")
    const gradientDirection = document.querySelector(".gradientDirection");
    const gradientColor1 = document.getElementById("gradientColor1");
    const gradientColor2 = document.getElementById("gradientColor2");
    const ResetButton = document.querySelector(".ResetButton")
    // Appearance Page

    // Theme choosing logic 

    if (ThemeSwitcher) {
        ThemeSwitcher.addEventListener("click", () => {
            DropDownToggle.classList.toggle("hidden")
            ThemeSwitcher.classList.toggle("open");
        })
    }

    const ThemeLabels = {
        dark: "Dark Mode",
        light: "Light Mode",
        system: "Sync with system"
    };

    UpdateSelectedTheme();

    function UpdateSelectedTheme() {
        const ThemeSelected = localStorage.getItem("theme");
        const ThemeLabel = ThemeLabels[ThemeSelected] || ThemeLabels["system"];
        if (SelectedTheme) {
            SelectedTheme.innerHTML = `${ThemeLabel}<i class="fa-solid fa-angle-down arrow"></i>`;
        }
    }



    ThemeOptions.forEach(option => {
        option.addEventListener("click", () => {
            const theme = option.dataset.theme
            localStorage.setItem("theme", theme)
            applyTheme(theme)

            UpdateSelectedTheme();
            DropDownToggle.classList.add("hidden")
            ThemeSwitcher.classList.remove("open");

        })
    })

    if (ThemeSwitcher) {
        window.addEventListener("click", function (event) {
            if (!ThemeSwitcher.contains(event.target)) {
                DropDownToggle.classList.add("hidden");
                ThemeSwitcher.classList.remove("open");
            }
        });
    }

    function setThemeMode(mode) {
        document.documentElement.classList.remove("dark-mode", "light-mode");
        if (mode === "dark") {
            document.documentElement.classList.add("dark-mode");
            if (LightModeDiv) LightModeDiv.style.display = "block";
            if (DarkModeDiv) DarkModeDiv.style.display = "none";
        } else {
            document.documentElement.classList.add("light-mode");
            if (LightModeDiv) LightModeDiv.style.display = "none";
            if (DarkModeDiv) DarkModeDiv.style.display = "block";
        }
    }

    function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        if (theme === "dark" || theme === "light") {
            setThemeMode(theme);
        } else if (theme === "system") {
            setThemeMode(getSystemTheme());
        }
    }

    // Background Options Logic

    // Solid Colour

    const backgroundLabels = {
        none: "None",
        solid: "Solid Colour",
        gradient: "Gradient Background"
    };

    updateSelectedBackground();

    function updateSelectedBackground() {
        const selected = localStorage.getItem("BackgroundOptions") || "none";
        const label = backgroundLabels[selected] || backgroundLabels.none;
        if (SelectedBackgroundOption) {
            SelectedBackgroundOption.innerHTML = `${label}<i class="fa-solid fa-angle-down arrow"></i>`;
        }
    }


    BackgroundOptions.forEach(option => {
        option.addEventListener("click", () => {
            localStorage.setItem("BackgroundOptions", option.dataset.background);
            updateSelectedBackground();
            DropDownToggle.classList.add("hidden")
            ThemeSwitcher.classList.remove("open");

            if (option.dataset.background == "gradient") {
                AddGradientBackground.style.display = "flex"
                gradientDirection.focus();
            } else {
                AddGradientBackground.style.display = "none"
            }

            if (option.dataset.background === "none") {
                document.getElementById("InjectedStyleID")?.remove();
                document.getElementById("InjectedStyleID2")?.remove();

                document.body.style.backgroundColor = "";
                document.body.style.backgroundImage = "";

                localStorage.removeItem("BackgroundSolidColor");
                localStorage.removeItem("BackgroundGradientColor");
            }





            // document.body.style.backgroundColor = "";
            // localStorage.setItem("BackgroundSolidColor", "")
            // localStorage.setItem("BackgroundGradientColor", "")

            // }
        })
    });


    if (BackgroundSwitcher) {
        BackgroundSwitcher.addEventListener("click", () => {
            BackgroundDropDownToggle.classList.toggle("hidden")
            BackgroundSwitcher.classList.toggle("open");
        })
    }

    if (ThemeSwitcher) {
        window.addEventListener("click", function (event) {
            if (!BackgroundSwitcher.contains(event.target)) {
                BackgroundDropDownToggle.classList.add("hidden");
                BackgroundSwitcher.classList.remove("open");
            }
        });
    }

    function SetBackgroundColor() {
        const SelectedColor = ColorPicker.value;
        console.log("Changing background to:", SelectedColor);
        // document.documentElement.classList.remove("dark-mode", "light-mode");

        let InjectedStyleID = document.getElementById("InjectedStyleID");
        if (!InjectedStyleID) {
            InjectedStyleID = document.createElement("style");
            InjectedStyleID.id = "InjectedStyleID";
            document.head.appendChild(InjectedStyleID);
        }

        document.getElementById("InjectedStyleID2")?.remove();

        InjectedStyleID.innerHTML = `html, body { background-color: ${SelectedColor} !important; }`;

        localStorage.setItem("BackgroundSolidColor", SelectedColor)
    }
    if (OpenColorPickerButton) {
        OpenColorPickerButton.addEventListener("click", () => {
            ColorPicker.click();
        });
    }
    if (ColorPicker) {
        ColorPicker.addEventListener("input", SetBackgroundColor);
    }


    // Gradient Colour

    function SetGradientBackgroundColor() {
        const SelectedColor1 = gradientColor1.value;
        const SelectedColor2 = gradientColor2.value;
        const direction = gradientDirection.value;
        const gradient = `linear-gradient(${direction}, ${SelectedColor1}, ${SelectedColor2})`;


        console.log("Changing background to:", gradient);
        // document.documentElement.classList.remove("dark-mode", "light-mode");

        let InjectedStyleID2 = document.getElementById("InjectedStyleID2");
        if (!InjectedStyleID2) {
            InjectedStyleID2 = document.createElement("style");
            InjectedStyleID2.id = "InjectedStyleID2";
            document.head.appendChild(InjectedStyleID2);
        }

        const oldSolid = document.getElementById("InjectedStyleID");
        if (oldSolid) oldSolid.remove();



        InjectedStyleID2.innerHTML = `html, body { background-image: ${gradient} !important; }`;

        localStorage.setItem("BackgroundGradientColor", gradient)
        localStorage.removeItem("BackgroundSolidColor");
    }

    if (applyCustomGradient) {
        applyCustomGradient.addEventListener("click", () => {
            SetGradientBackgroundColor()
            AddGradientBackground.style.display = "none"
        })
    }

    if (GradientClose) {
        GradientClose.addEventListener("click", () => {
            AddGradientBackground.style.display = "none";
        })
    }

    if (gradientDirection) {
        gradientDirection.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                AddGradientBackground.style.display = "none";
            }
        });
    }

    // Reset to Default
    function removeInjectedStyles() {
        document.getElementById("InjectedStyleID")?.remove();
        document.getElementById("InjectedStyleID2")?.remove();
    }

    function clearBackgroundStyles() {
        document.body.style.backgroundColor = "";
        document.body.style.backgroundImage = "";
    }

    function SetToDefault() {
        removeInjectedStyles();
        clearBackgroundStyles();

        localStorage.removeItem("BackgroundSolidColor");
        localStorage.removeItem("BackgroundGradientColor");

        localStorage.setItem("theme", ThemeLabels?.system || "system");
        localStorage.setItem("BackgroundOptions", "none");

        updateSelectedBackground();
        UpdateSelectedTheme?.();

        location.reload();

    }

    if (ResetButton) {
        ResetButton.addEventListener("click", () => {
            SetToDefault()
        })
    }

    // UI logic

    // if (UISwitcher) {
    //     UISwitcher.addEventListener("click", () => {
    //         UIDropDownToggle.classList.toggle("hidden")
    //         UISwitcher.classList.toggle("open")
    //     })
    // }

    // window.addEventListener("click", function (event) {
    //     if (!UISwitcher.contains(event.target)) {
    //         UIDropDownToggle.classList.add("hidden");
    //         UISwitcher.classList.remove("open");
    //     }
    // });
})