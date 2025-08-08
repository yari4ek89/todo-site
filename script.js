const input = document.querySelector('.task-input');
const taskAdd = document.querySelector('.task-add');
const tasksContainer = document.querySelector('.tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render Tasks
function renderTasks() {
    tasksContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskEl = document.createElement('div');
        taskEl.classList.add('task');

        const checkBtn = document.createElement('button');
        checkBtn.textContent = 'Complete';
        checkBtn.classList.add('task-button');
        checkBtn.addEventListener('click', () => completeTask(index));

        const taskText = document.createElement('p');
        taskText.textContent = task.task;
        if (task.isCompleted) taskText.style.color = 'green';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('task-button');
        deleteBtn.addEventListener('click', () => deleteTask(index));

        taskEl.appendChild(checkBtn);
        taskEl.appendChild(taskText);
        taskEl.appendChild(deleteBtn);

        tasksContainer.appendChild(taskEl);
    });
}

// Add Task
function addTask() {
    const text = input.value.trim();
    if (!text) return;

    tasks.push({ task: text, isCompleted: false });
    saveTasks();
    renderTasks();
    input.value = '';
}

// Complete Task
function completeTask(index) {
    tasks[index].isCompleted = true;
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save into localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Listeners
taskAdd.addEventListener('click', addTask);
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
});

// First Render
renderTasks();