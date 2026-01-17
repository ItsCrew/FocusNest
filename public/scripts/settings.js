document.addEventListener("DOMContentLoaded", () => {
    const TimeInputs = document.querySelectorAll(".PomodoroTimeInput")
    const PomodoroModeSlider = document.querySelector(".PomodoroModeSlider")
    const BrowserNotificationsSlider = document.querySelector(".BrowserNotificationsSlider")

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
});
