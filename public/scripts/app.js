document.addEventListener("DOMContentLoaded", () => {
    checkAuth()
    const savedTheme = localStorage.getItem("theme");
    const TimeInputs = document.querySelectorAll(".PomodoroTimeInput")
    const PomodoroModeSlider = document.querySelector(".PomodoroModeSlider")
    const BrowserNotificationsSlider = document.querySelector(".BrowserNotificationsSlider")
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
    const ThemeSwitcher = document.querySelector(".ThemeSwitcher")
    const ThemeOptions = document.querySelectorAll(".ThemeOption")
    const SelectedTheme = document.querySelector(".SelectedTheme")
    const DropDownToggle = document.querySelector(".DropDownToggle")
    const BackgroundSwitcher = document.querySelector(".BackgroundSwitcher")
    const BackgroundOptions = document.querySelectorAll(".BackgroundOption")
    const SelectedBackgroundOption = document.querySelector(".SelectedBackgroundOption")
    const BackgroundDropDownToggle = document.querySelector(".BackgroundDropDownToggle")
    const UISwitcher = document.querySelector(".UISwitcher")
    const UIOption = document.querySelectorAll(".UIOption")
    const SelectedUIOption = document.querySelector(".SelectedUIOption")
    const UIDropDownToggle = document.querySelector(".UIDropDownToggle")
    const ColorPicker = document.getElementById("ColorPicker");
    const RemoveColour = document.querySelector(".RemoveColour")
    const OpenColorPickerButton = document.querySelector(".OpenColorPickerButton");
    const CommonTaskAdding = document.querySelectorAll(".CommonTaskAdding")
    const AddTasksButton = document.querySelector(".AddTasksButton")
    const AddPrompt = document.querySelector(".AddPrompt");
    const AddModal = document.querySelector(".AddModal");
    const CloseModal = document.querySelector(".close");
    const AddTask = document.querySelector(".AddTask");
    const ListContainer = document.getElementById("ListContainer");
    const clearButton = document.querySelector(".ClearButton");
    const AddPromptButton = document.querySelector(".AddPromptButton")
    const NoTasks = document.querySelector(".NoTasks")
    const InputBox = document.getElementById("InputBox");
    const ContextMenu = document.querySelector(".ContextMenu");
    const editButton = document.querySelector(".EditOption");
    const MarkDone = document.querySelector(".MarkDone");
    const MarkNotDone = document.querySelector(".MarkNotDone");
    const removeButton = document.querySelector(".RemoveOption");
    const ColorPickerTasks = document.getElementById("ColorPickerTasks");
    const OpenColorPickerButtonTasks = document.getElementById("OpenColorPickerButtonTasks");
    const TextBeforeAddingTasks = document.querySelector(".TextBeforeAddingTasks")
    const AddGradientBackground = document.querySelector(".AddGradientBackground")
    const GradientClose = document.querySelector(".GradientClose")
    const applyCustomGradient = document.querySelector(".applyCustomGradient")
    const gradientDirection = document.querySelector(".gradientDirection");
    const gradientColor1 = document.getElementById("gradientColor1");
    const gradientColor2 = document.getElementById("gradientColor2");
    const GradientModalContent = document.querySelector(".GradientModalContent")
    const ResetButton = document.querySelector(".ResetButton")
    const ResetToDefault = document.querySelector(".ResetToDefault")
    const Logout = document.querySelector(".Logout")
    const ClearAllPopUp = document.querySelector(".ClearAllPopUp")
    const ConfirmButton = document.querySelector(".ConfirmButton")
    const CancelButton = document.querySelector(".CancelButton")
    const WhatsNewModal = document.querySelector(".WhatsNewModal")
    const OkayButton = document.querySelector(".OkayButton")
    const CurrentVersion = '2.8' //2.1.8

    // LoadTasks()

    async function checkAuth() {
        try {
            const response = await fetch('/auth/status');
            const data = await response.json();

            if (!data.authenticated) {
                Logout.style.display = "none"
            } else {
                Logout.style.display = "flex"
            }

            let UserVersion = localStorage.getItem('focusnest_version')

            if (UserVersion < CurrentVersion) {
                WhatsNewModal.classList.add("show")
                localStorage.setItem('focusnest_version', CurrentVersion)
            } else {
                console.log('up to date');
            }

            return data.authenticated;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function ensureAuthenticated() {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
            window.location.href = '/Signup';
            return false;
        }
        return true;
    }

    // async function LoadTasks() {
    //     try {
    //         const response = await axios.get('/api/v1/Tasks'); // Getting all the things we get from api/v1/Notes
    //         const tasks = response.data.Tasks; // Taking out Notes from

    //         // Create and append each note element
    //         tasks.forEach(task => {
    //             console.log(task);
    //         });


    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    loadTasksFromDatabase()
    // if (ListContainer && ListContainer.children.length === 0) {
    //     console.log("The children length is 0");
    //     if (TextBeforeAddingTasks && clearButton) {
    //         clearButton.style.display = "block"
    //         TextBeforeAddingTasks.style.display = "none"
    //     }
    // }


    const defaultValues = {
        PomodoroMode: 25,
        ShortBreak: 5,
        LongBreak: 10
    };

    if (PomodoroModeSlider) {
        PomodoroModeSlider.checked = localStorage.getItem("CheckBox") === "true";
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

    if (PomodoroModeSlider) {
        PomodoroModeChange();
    }

    if (PomodoroModeSlider) {
        PomodoroModeSlider.addEventListener("change", () => {
            const isChecked = PomodoroModeSlider.checked;
            localStorage.setItem("CheckBox", isChecked);
            PomodoroModeChange();
        })
    }


    // All Pages Side Bar Logic

    bars.addEventListener("click", () => {
        SideBar.classList.toggle("hide");
        bars.classList.toggle("shift-left");
        bars.classList.toggle("cross");
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

    function PomodoroModeChange() {
        TimeInputs.forEach(input => {
            const type = input.dataset.type;
            const saved = localStorage.getItem(type);

            if (PomodoroModeSlider.checked) {
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


    // TASKS PAGE

    CommonTaskAdding.forEach(modals => {
        modals.addEventListener("click", () => {
            AddModal.style.display = "flex";
            InputBox.focus();
        })
    })

    if (CloseModal) {
        CloseModal.addEventListener("click", () => {
            AddModal.style.display = "none";
        })
    }
    if (InputBox) {
        InputBox.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                AddModal.style.display = "none";
            }
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target === AddGradientBackground) {
            AddGradientBackground.style.display = "none";
        }
        if (event.target === AddModal) {
            AddModal.style.display = "none";
        }
    });

    function UpdateContextMenuOptions() {
        if (ContextMenu.currentTask) {
            const taskTextElement =
                ContextMenu.currentTask.querySelector(".TaskText");

            if (taskTextElement.style.textDecoration === "line-through") {
                MarkDone.style.display = "none";
                MarkNotDone.style.display = "block";
            } else {
                MarkDone.style.display = "block";
                MarkNotDone.style.display = "none";
            }

            if (ContextMenu.currentTask.style.backgroundColor == "") {
                RemoveColour.style.display = "none"
            } else {
                RemoveColour.style.display = "block"
            }
        }
    }

    async function AddTaskFunction() {
        try {
            const Task = InputBox.value.trim();
            if (!Task) return;
            AddModal.style.display = "none";
            InputBox.value = "";
            TextBeforeAddingTasks.style.display = "none";
            if (clearButton) clearButton.style.display = "block";
            if (AddTasksButton) AddTasksButton.style.display = "block";

            const tempId = `temp-${Date.now()}`;
            const taskElement = CreateTaskElement(Task, "", false, tempId);

            const isAuthenticated = await ensureAuthenticated();
            if (!isAuthenticated) return;

            axios.post('/api/v1/Tasks', { Task })
                .then(response => {
                    const realTask = response.data.Tasks;
                    taskElement.dataset.taskId = realTask._id;
                })
                .catch(error => {
                    console.error(error);
                    taskElement.remove();
                    alert("Failed to add task. Try again.");
                });
        } catch (error) {
            console.error(error);
        }
    }


    function CreateTaskElement(taskText, color = "", checked = false, taskId = null) {
        const li = document.createElement("li");
        li.setAttribute("data-checked", checked);

        if (taskId) {
            li.dataset.taskId = taskId;
        }

        if (color) {
            li.style.backgroundColor = color;
        }

        li.innerHTML = `
          <span class="TaskText"> <i class="fa-regular fa-square"></i> ${taskText} <i class="fa-solid fa-ellipsis-vertical KebabMenu" title="Drag to move\nClick to open menu"></i> </span>
        `;
        if (checked) {
            const taskTextElement = li.querySelector(".TaskText");
            taskTextElement.style.textDecoration = "line-through";
            const iconElement = taskTextElement.querySelector("i");
            if (iconElement) {
                iconElement.classList.remove("fa-square");
                iconElement.classList.add("fa-check-square");
            }
        }
        if (ListContainer) {
            ListContainer.appendChild(li);
        }
        // Context menu setup for the task
        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            // Position and show the context menu
            ContextMenu.style.top = `${e.clientY}px`;
            ContextMenu.style.left = `${e.clientX}px`;
            ContextMenu.style.display = "block";
            // if (PriorityContextMenu) PriorityContextMenu.style.display = "none";

            // Store reference to the current task for edit/remove actions
            ContextMenu.currentTask = li;
            UpdateContextMenuOptions();
        });

        return li;
    }

    if (ContextMenu) {
        document.addEventListener("click", (e) => {
            if (!ContextMenu.contains(e.target)) {
                ContextMenu.style.display = "none";
                // if (PriorityContextMenu) PriorityContextMenu.style.display = "none";
            }
        });
    }

    // Enable drag-and-drop reordering for tasks using SortableJS
    if (ListContainer && window.Sortable) {
        const sortable = new Sortable(ListContainer, {
            animation: 150,
            // ghostClass: 'drag-ghost',
            handle: ".KebabMenu",
            async onEnd() {
                const isAuthenticated = await ensureAuthenticated();
                if (!isAuthenticated) return;

                const orderedIds = Array.from(ListContainer.children)
                    .map(li => li.dataset.taskId)
                    .filter(Boolean);
                if (orderedIds.length > 0) {
                    axios.post('/api/v1/Tasks/reorder', { orderedIds })
                        .catch(error => {
                            console.error('Failed to save task order:', error);
                        });
                }
            }
        });
    }
    if (AddTask) {
        AddTask.addEventListener("click", () => {
            AddTaskFunction();
        });
    }

    if (InputBox) {
        InputBox.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                AddTaskFunction();
            }
        });
    }
    if (editButton) {
        editButton.addEventListener("click", () => {
            if (ContextMenu.currentTask) {
                EditTask(ContextMenu.currentTask);
                ContextMenu.style.display = "none";
            }
        });
    }

    function EditTask(li) {
        const taskText = li.querySelector(".TaskText").textContent.trim();
        const id = li.dataset.taskId; // Get the task ID from the DOM element

        const input = document.createElement("input");
        input.type = "text";
        input.value = taskText;
        input.placeholder = "Edit the task";
        input.className = "EditInput";

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.classList.add("btn");
        saveButton.className = "SaveButton";

        // Clear the task text and add the input field for editing
        li.innerHTML = "";
        li.appendChild(input);
        li.appendChild(saveButton);

        async function saveUpdatedTask() {

            try {
                const Task = input.value.trim();
                if (Task) {
                    li.innerHTML = `<span class="TaskText"> <i class="fa-regular fa-square"></i> ${Task} <i class="fa-solid fa-ellipsis-vertical KebabMenu"></i> </span>`;
                    const isAuthenticated = await ensureAuthenticated();
                    if (!isAuthenticated) return;
                    await axios.patch(`/api/v1/Tasks/${id}`, { Task })
                } else {
                    console.log("Task cannot be empty!");
                }
            } catch (error) {
                console.log(error);
            }
        }

        saveButton.addEventListener("click", saveUpdatedTask);
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                saveUpdatedTask();
            }
        });

        input.focus();
    }

    async function SetTileColor(id) {

        try {
            const SelectedColor = ColorPickerTasks.value;
            if (ContextMenu.currentTask) {
                ContextMenu.currentTask.style.backgroundColor = SelectedColor;
                const id = ContextMenu.currentTask.dataset.taskId;
                const isAuthenticated = await ensureAuthenticated();
                if (!isAuthenticated) return;
                if (id) await axios.patch(`/api/v1/Tasks/${id}`, { Color: SelectedColor }).catch(console.log);
            }
        } catch (error) {
            console.log(error);

        }
    }

    async function RemoveTileColor(id) {

        try {
            if (ContextMenu.currentTask) {
                ContextMenu.currentTask.style.backgroundColor = "";
                const id = ContextMenu.currentTask.dataset.taskId;
                const isAuthenticated = await ensureAuthenticated();
                if (!isAuthenticated) return;
                if (id) await axios.patch(`/api/v1/Tasks/${id}`, { Color: "" })
            }
        } catch (error) {
            console.log(error);

        }
    }


    if (OpenColorPickerButtonTasks) {
        OpenColorPickerButtonTasks.addEventListener("click", () => {
            ColorPickerTasks.click();
            ContextMenu.style.display = "none";
        });
    }


    if (ColorPickerTasks) {
        ColorPickerTasks.addEventListener("input", () => {
            SetTileColor(ContextMenu.currentTask)
        })
    }

    if (RemoveColour) {
        RemoveColour.addEventListener("click", () => {
            RemoveTileColor(ContextMenu.currentTask)
            ContextMenu.style.display = "none";
        })
    }

    //Mark a task done/Incomplete
    async function MarkTaskDone(taskElement) {
        if (taskElement) {

            const id = taskElement.dataset.taskId;
            const taskTextElement = taskElement.querySelector(".TaskText");
            taskElement.setAttribute("data-checked", "true");
            taskTextElement.style.textDecoration = "line-through";
            const iconElement = taskTextElement.querySelector("i");
            if (iconElement) {
                iconElement.classList.remove("fa-square");
                iconElement.classList.add("fa-check-square");
            }
            ContextMenu.style.display = "none";
            const isAuthenticated = await ensureAuthenticated();
            if (!isAuthenticated) return;
            await axios.patch(`/api/v1/Tasks/${id}`, { Completed: true })
        }
    }

    async function MarkTaskIncomplete(taskElement) {
        if (taskElement) {

            const id = taskElement.dataset.taskId;
            const taskTextElement = taskElement.querySelector(".TaskText");
            taskElement.setAttribute("data-checked", "false");
            taskTextElement.style.textDecoration = "none";
            const iconElement = taskTextElement.querySelector("i");
            if (iconElement) {
                iconElement.classList.remove("fa-check-square");
                iconElement.classList.add("fa-square");
            }
            ContextMenu.style.display = "none";
            const isAuthenticated = await ensureAuthenticated();
            if (!isAuthenticated) return;
            await axios.patch(`/api/v1/Tasks/${id}`, { Completed: false })
        }
    }

    if (ListContainer) {
        ListContainer.addEventListener("click", (event) => {
            if (event.target.classList && event.target.classList.contains("KebabMenu")) {
                const li = event.target.closest("li");
                const rect = event.target.getBoundingClientRect();

                ContextMenu.style.top = `${Math.round(rect.bottom + window.scrollY)}px`;
                ContextMenu.style.left = `${Math.round(rect.left + window.scrollX)}px`;
                ContextMenu.style.display = "block";
                // if (PriorityContextMenu) PriorityContextMenu.style.display = "none";

                ContextMenu.currentTask = li;
                UpdateContextMenuOptions();

                event.stopPropagation();
                return;
            }

            if (event.target.classList.contains("fa-square")) {
                event.target.classList.remove("fa-square");
                event.target.classList.add("fa-check-square");
                MarkTaskDone(event.target.closest("li"));
            } else if (event.target.classList.contains("fa-check-square")) {
                event.target.classList.remove("fa-check-square");
                event.target.classList.add("fa-square");
                MarkTaskIncomplete(event.target.closest("li"));
            }
        });
    }

    if (MarkDone) {
        MarkDone.addEventListener("click", () => {
            MarkTaskDone(ContextMenu.currentTask);
        });
    }

    if (MarkNotDone) {
        MarkNotDone.addEventListener("click", () => {
            MarkTaskIncomplete(ContextMenu.currentTask);
        });
    }

    async function RemoveTask() {
        if (ContextMenu.currentTask) {

            try {
                const TaskID = ContextMenu.currentTask.dataset.taskId
                if (!TaskID) {
                    console.log("No task id found");
                    return;
                }

                ContextMenu.currentTask.remove();
                ContextMenu.style.display = "none";
                if (ListContainer.children.length === 0) {
                    clearButton.style.display = "none";
                    TextBeforeAddingTasks.style.display = "flex"
                    AddTasksButton.style.display = "none";
                }
                const isAuthenticated = await ensureAuthenticated();
                if (!isAuthenticated) return;
                await axios.delete(`/api/v1/Tasks/${TaskID}`)
                loadTasksFromDatabase()
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (ListContainer) {
        if (ListContainer.children.length === 0) {
            // NoTasks.style.display = "block";
            clearButton.style.display = "none";
            // AddPromptButton.style.display = "block"
            // AddPrompt.style.display = "flex"
            TextBeforeAddingTasks.style.display = "flex"

        }
    }

    if (removeButton) {
        removeButton.addEventListener("click", () => {
            RemoveTask()
        })
    }


    // Clear Button Logic
    async function Clear_Tasks() {

        try {
            ListContainer.innerHTML = "";
            clearButton.style.display = "none";
            AddTasksButton.style.display = "none";
            TextBeforeAddingTasks.style.display = "flex"
            const isAuthenticated = await ensureAuthenticated();
            if (!isAuthenticated) return;
            await axios.delete('/api/v1/Tasks')
            loadTasksFromDatabase()
        } catch (error) {
            console.log(error);
        }
    }


    if (clearButton) {
        clearButton.addEventListener("click", () => {
            ClearAllPopUp.classList.add("show")
            if (ConfirmButton) ConfirmButton.focus();
        })
    }

    if (ConfirmButton) {
        ConfirmButton.addEventListener("click", () => {
            Clear_Tasks()
            ClearAllPopUp.classList.remove("show")
        })
    }


    if (ConfirmButton) {
        ConfirmButton.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                Clear_Tasks()
                ClearAllPopUp.classList.remove("show")
            } else if (event.key === "Escape") {
                ClearAllPopUp.classList.remove("show")
            }
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target === ClearAllPopUp) {
            ClearAllPopUp.classList.remove("show")
        }
    });

    if (CancelButton) {
        CancelButton.addEventListener("click", () => {
            ClearAllPopUp.classList.remove("show")
        })
    }

    if (OkayButton) {
        OkayButton.addEventListener("click", () => {
            WhatsNewModal.classList.remove("show")
        })
    }

    async function loadTasksFromDatabase() {
        try {
            const response = await axios.get('/api/v1/Tasks');
            const tasks = response.data.Tasks;

            if (ListContainer && ListContainer.innerHTML !== "") {
                ListContainer.innerHTML = "";
                console.log("Clearing List Container");
            }

            if (!tasks || tasks.length === 0) {
                console.log("No tasks found");
                if (TextBeforeAddingTasks && clearButton) {
                    clearButton.style.display = "none";
                    AddTasksButton.style.display = "none";
                    TextBeforeAddingTasks.style.display = "flex";
                }
            } else {
                tasks.forEach(({ _id, Task, Color, Completed }) => CreateTaskElement(Task, Color, Completed, _id));
                if (TextBeforeAddingTasks && clearButton) {
                    clearButton.style.display = "block";
                    AddTasksButton.style.display = "block";
                    TextBeforeAddingTasks.style.display = "none";
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Theme Switch
    DarkMode.addEventListener("click", () => {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
        LightModeDiv.style.display = "block";
        DarkModeDiv.style.display = "none";
        if (SelectedTheme) {
            SelectedTheme.innerHTML = `Dark Mode <i class="fa-solid fa-angle-down arrow"></i>`
        }
    });

    LightMode.addEventListener("click", () => {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
        localStorage.setItem("theme", "light");
        LightModeDiv.style.display = "none";
        DarkModeDiv.style.display = "block";
        if (SelectedTheme) {
            SelectedTheme.innerHTML = `Light Mode<i class="fa-solid fa-angle-down arrow"></i>`
        }
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
        bars.classList.add("cross");
        main.classList.add("shifted");
    }
});