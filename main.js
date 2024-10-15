class Tasks {
    constructor(title, id, steps = []) {
        this.title = title;
        this.id = id;
        this.steps = steps; // Ensure steps are set on task creation
    }

    addStep(step) {
        this.steps.push(step);
        localStorage.setItem('goalList', JSON.stringify(goalList));
        console.log(this.steps);

    }
}

let idCounter = localStorage.getItem('idCounter') ? parseInt(localStorage.getItem('idCounter')) : 1;
let goalList = JSON.parse(localStorage.getItem('goalList')) || [];


goalList = goalList.map(task => new Tasks(task.title, task.id, task.steps));

// Function to add a task
function addTask() {
    const taskName = document.getElementById("taskName").value;
    const newId = idCounter++;
    if (taskName) {
        const newTask = new Tasks(taskName, newId);
        goalList.push(newTask);
        localStorage.setItem('goalList', JSON.stringify(goalList));
        localStorage.setItem('idCounter', idCounter);
        renderTasks();
        document.getElementById("taskName").value = "";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert('Need to put a Task');
    }
}

// Function to render the list of tasks
var taskList = document.querySelector(".tasks-list");
window.addEventListener("load", renderTasks);

function renderTasks() {
    taskList.innerHTML = "";
    goalList.forEach(task => {
        taskList.innerHTML += `
            <section class="solo-task" id="task-${task.id}" onclick="renderPageInfo(${task.id})">
                <h5>${task.title}</h5>
                <i class="fa-regular fa-circle-xmark" onclick="deleteTask(${task.id}); event.stopPropagation();"></i>
            </section>`;
    });
}

function renderStepsBlank() {
    content.innerHTML = " "
        document.getElementById('taskTitle').textContent = 'Select another Task'
            content.innerHTML += `
                <div class="todo-item">
                    <span><h6>Select a new Task</h6></span>
                </div>`;
}



// Deletes a single task
function deleteTask(id) {
    goalList = goalList.filter(task => task.id !== id);
    localStorage.setItem('goalList', JSON.stringify(goalList));
    console.log(`Task with id ${id} has been deleted.`);
    renderTasks();
    renderStepsBlank();
}

// Deletes all tasks
function deleteAllTasks() {
    goalList = [];
    localStorage.clear();
    taskList.innerHTML = `<h5>Add a Task</h5>`;
    console.log("All tasks have been deleted.");
}

// Renders the Page Info
var content = document.querySelector(".tasks");

function renderPageInfo(id) {
    const task = goalList.find(task => task.id === id);
    if (task) {
        document.getElementById('taskTitle').textContent = `${task.title}`;
        document.getElementById('taskId').value = id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        content.innerHTML = '';
        if (Array.isArray(task.steps) && task.steps.length > 0) {
            task.steps.forEach(step => {
                content.innerHTML += `
                <div class="todo-item">
                    <span><input type="checkbox">${step}</span> <span><i class="delete-step fa-regular fa-circle-xmark" onclick="deleteStep(${id}, '${step}')"></i></span>
                </div>`;
            });
        } else {
            content.innerHTML = `<p>No steps available for this task.</p>`;
        }
    } else {
        console.log('Task not found in Render');
    }
}

// Adds a step to the Task
function addStepFunc() {
    const stepName = document.getElementById("stepName").value;
    const taskId = parseInt(document.getElementById("taskId").value);

    if (stepName && !isNaN(taskId)) {
        const task = goalList.find(task => task.id === taskId);
        if (task && task instanceof Tasks) {
            task.addStep(stepName);
            console.log(goalList);

            renderPageInfo(taskId);
            document.getElementById("stepName").value = "";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('Task not found or it is not a Tasks instance!');
        }
    } else {
        alert('Please enter a valid step and task ID.');
    }
}

function deleteStep(taskId, stepName) {
    const task = goalList.find(task => task.id === taskId);

    if (task && task instanceof Tasks) {
        const stepIndex = task.steps.indexOf(stepName);
        if (stepIndex !== -1) {
            task.steps.splice(stepIndex, 1); // Remove the step
            localStorage.setItem('goalList', JSON.stringify(goalList));

            console.log(`Step "${stepName}" removed from task "${task.title}"`);
            renderPageInfo(taskId);
        } else {
            console.log(`Step "${stepName}" not found in task "${task.title}"`);
        }
    } else {
        console.log('Task not found or it is not an instance of Tasks!');
    }
}
