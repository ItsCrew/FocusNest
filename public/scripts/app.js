document.addEventListener("DOMContentLoaded", () => {
    checkAuth()
    const Logout = document.querySelector(".Logout")
    const WhatsNewModal = document.querySelector(".WhatsNewModal")
    const OkayButton = document.querySelector(".OkayButton")
    const CurrentVersion = '2.3' //2.3.0

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

    // WhatsNewModal.classList.add("show")


})