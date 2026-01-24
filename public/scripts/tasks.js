document.addEventListener("DOMContentLoaded", () => {
    checkAuth()
    const RemoveColour = document.querySelector(".RemoveColour")
    const CommonTaskAdding = document.querySelectorAll(".CommonTaskAdding")
    const AddTasksButton = document.querySelector(".AddTasksButton")
    const AddModal = document.querySelector(".AddModal");
    const CloseModal = document.querySelector(".close");
    const AddTask = document.querySelector(".AddTask");
    const ListContainer = document.getElementById("ListContainer");
    const clearButton = document.querySelector(".ClearButton");
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
    const Logout = document.querySelector(".Logout")
    const ClearAllPopUp = document.querySelector(".ClearAllPopUp")
    const ConfirmButton = document.querySelector(".ConfirmButton")
    const CancelButton = document.querySelector(".CancelButton")
    const WhatsNewModal = document.querySelector(".WhatsNewModal")
    const OkayButton = document.querySelector(".OkayButton")
    const PriorityContextMenu = document.querySelector(".PriorityContextMenu")
    const PriorityDropdownMenu = document.querySelector(".PriorityDropdownMenu")
    const PriorityDropdownToggle = document.querySelector(".PriorityDropdownToggle")
    const AddPromptButton = document.querySelector(".AddPromptButton")
    const CurrentVersion = '2.3' //2.3.0
    // TASKS PAGE

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


    window.ensureAuthenticated = async function () {
        // return true;
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
            window.location.href = '/Signup';
            return false;
        }
        return true;
    }

    // Helper function to focus the visible button that opens the modal
    function focusModalTriggerButton() {
        if (AddTasksButton && window.getComputedStyle(AddTasksButton).display !== "none") {
            AddTasksButton.focus();
            return;
        }
        if (AddPromptButton && window.getComputedStyle(AddPromptButton).display !== "none") {
            AddPromptButton.focus();
            return;
        }
    }

    CommonTaskAdding.forEach(modals => {
        modals.addEventListener("click", () => {
            AddModal.style.display = "flex";
            InputBox.focus();
        })
    })

    if (CloseModal) {
        CloseModal.addEventListener("click", () => {
            AddModal.style.display = "none";
            focusModalTriggerButton();
        })
    }
    if (InputBox) {
        InputBox.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                AddModal.style.display = "none";
                focusModalTriggerButton();
            }
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target === AddGradientBackground) {
            AddGradientBackground.style.display = "none";
        }
        if (event.target === AddModal) {
            AddModal.style.display = "none";
            focusModalTriggerButton();
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
            const Priority = PriorityDropdownToggle.getAttribute("data-priority");
            const taskElement = CreateTaskElement(Task, "", false, Priority, tempId);

            const isAuthenticated = await window.ensureAuthenticated();
            if (!isAuthenticated) return;

            axios.post('/api/v1/Tasks', { Task, Priority })
                .then(response => {
                    const realTask = response.data.Tasks;
                    taskElement.dataset.taskId = realTask._id;
                })
                .catch(error => {
                    console.error(error);
                    // taskElement.remove();
                    // alert("Failed to add task. Try again.");
                });
        } catch (error) {
            console.error(error);
        }
    }

    function CreateTaskElement(taskText, color = "", checked = false, Priority, taskId = null) {
        const li = document.createElement("li");
        li.setAttribute("data-checked", checked);
        li.setAttribute("data-priority", Priority);

        if (taskId) {
            li.dataset.taskId = taskId;
        }

        if (color) {
            li.style.backgroundColor = color;
        }

        const priorityClass = Priority === "P0" ? "PriorityZero" : Priority === "P1" ? "PriorityOne" : "PriorityTwo";
        li.innerHTML = `
        <span class="TaskText"> 
            <i class="fa-regular fa-square"></i> 
            <span class="TaskContent">${taskText}</span> 
            <span class="prioritybox ${priorityClass}"> ${Priority} <i class="fa-solid fa-circle-chevron-down chevron"> </i> </span>  
            <i class="fa-solid fa-ellipsis-vertical KebabMenu" title="Drag to move\nClick to open menu"></i> 
        </span>
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

            ContextMenu.currentTask = li;
            UpdateContextMenuOptions();
        });

        return li;
    }

    if (ContextMenu) {
        document.addEventListener("click", (e) => {
            if (!ContextMenu.contains(e.target)) {
                ContextMenu.style.display = "none";
            }
        });
    }

    if (PriorityContextMenu) {
        document.addEventListener("click", async (e) => {
            if (!PriorityContextMenu.contains(e.target)) {
                PriorityContextMenu.style.display = "none";
            } else if (e.target.closest(".PriorityZero, .PriorityOne, .PriorityTwo")) {
                const priorityOption = e.target.closest(".PriorityZero, .PriorityOne, .PriorityTwo");
                const priority = priorityOption.dataset.priority;
                const taskElement = PriorityContextMenu.currentTask;

                if (taskElement && priority) {
                    // Update the data-priority attribute
                    taskElement.setAttribute("data-priority", priority);

                    // Update the prioritybox text and class
                    const prioritybox = taskElement.querySelector(".prioritybox");
                    if (prioritybox) {
                        const priorityClass = priority === "P0" ? "PriorityZero" : priority === "P1" ? "PriorityOne" : "PriorityTwo";
                        prioritybox.className = `prioritybox ${priorityClass}`;
                        prioritybox.childNodes[0].textContent = ` ${priority} `;
                    }
                    PriorityContextMenu.style.display = "none";

                    // Update in database
                    const taskId = taskElement.dataset.taskId;
                    if (taskId) {
                        const isAuthenticated = await window.ensureAuthenticated();
                        if (isAuthenticated) {
                            axios.patch(`/api/v1/Tasks/${taskId}`, { Priority: priority })
                                .catch(error => console.error('Failed to update priority:', error));
                        }
                    }
                }

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
                const isAuthenticated = await window.ensureAuthenticated();
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
            focusModalTriggerButton();

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

    if (PriorityDropdownMenu) {
        PriorityDropdownToggle.addEventListener("click", (event) => {
            PriorityDropdownMenu.classList.toggle("show");
            PriorityDropdownToggle.classList.toggle("open");
        });

        PriorityDropdownMenu.addEventListener("click", (event) => {
            const target = event.target;
            if (target.classList.contains("PriorityOption")) {
                const priority = target.dataset.priority;
                PriorityDropdownToggle.setAttribute("data-priority", priority);
                PriorityDropdownToggle.querySelector(".SelectedPriority").textContent = priority;
            }

            PriorityDropdownMenu.classList.remove("show");
            PriorityDropdownToggle.classList.remove("open");
        });
    }

    function EditTask(li) {
        const taskText = li.querySelector(".TaskContent").textContent.trim();
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
                const currentPriority = li.getAttribute("data-priority") || "P0";
                const priorityClass = currentPriority === "P0" ? "PriorityZero" : currentPriority === "P1" ? "PriorityOne" : "PriorityTwo";
                if (Task) {
                    li.innerHTML = `
                    <span class="TaskText"> 
                        <i class="fa-regular fa-square"></i> 
                        <span class="TaskContent">${Task}</span> 
                        <span class="prioritybox ${priorityClass}"> ${currentPriority} <i class="fa-solid fa-circle-chevron-down chevron"> </i> </span>
                        <i class="fa-solid fa-ellipsis-vertical KebabMenu"></i> 
                    </span>
                `;
                    const isAuthenticated = await window.ensureAuthenticated();
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
                const isAuthenticated = await window.ensureAuthenticated();
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
                const isAuthenticated = await window.ensureAuthenticated();
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
            const isAuthenticated = await window.ensureAuthenticated();
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
            const isAuthenticated = await window.ensureAuthenticated();
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
                if (ContextMenu.currentTask.style.backgroundColor == "") {
                    RemoveColour.style.display = "none"
                } else {
                    RemoveColour.style.display = "block"
                }

                event.stopPropagation();
                return;
            } else if (event.target.classList && event.target.classList.contains("prioritybox") || event.target.classList.contains("chevron")) {
                const li = event.target.closest("li");
                const rect = event.target.getBoundingClientRect();

                PriorityContextMenu.style.top = `${Math.round(rect.bottom + window.scrollY)}px`;
                PriorityContextMenu.style.left = `${Math.round(rect.left + window.scrollX)}px`;
                PriorityContextMenu.style.display = "block";

                PriorityContextMenu.currentTask = li;
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
                const isAuthenticated = await window.ensureAuthenticated();
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
            const isAuthenticated = await window.ensureAuthenticated();
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
                clearButton.focus();
            }
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target === ClearAllPopUp) {
            ClearAllPopUp.classList.remove("show")
            clearButton.focus();
        }
    });

    if (CancelButton) {
        CancelButton.addEventListener("click", () => {
            ClearAllPopUp.classList.remove("show")
            clearButton.focus();
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
                tasks.forEach(({ _id, Task, Color, Completed, Priority }) => CreateTaskElement(Task, Color, Completed, Priority, _id));
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

    // Load tasks on page load
    loadTasksFromDatabase();
});