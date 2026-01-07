// Initialise an empty array to hold tasks
let tasks = [];

// Function to add a new task
function addTask() {
    // Get the task input value
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    // Only add the task if the input is not empty
    if (taskText) {
        // Create a new task object
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        // Add the new task to the tasks array
        tasks.push(task);
        // Re-render the task list
        renderTasks();
        // Clear the input field
        taskInput.value = '';
    }
}

// Function to render the task list
function renderTasks() {
    // Get the task list container
    const taskList = document.getElementById('taskList');
    // Clear the existing tasks
    taskList.innerHTML = '';
    // Loop through the tasks and create list items
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons';
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleTaskCompletion(task.id);
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeTask(task.id);
        
        // Append buttons to the button container
        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(removeBtn);
        
        // Append text and buttons to the list item
        li.appendChild(taskText);
        li.appendChild(buttonContainer);
        
        // Append the list item to the task list
        taskList.appendChild(li);
    });
    // Save the updated tasks to local storage
    save();
}

// Function to toggle task completion status
function toggleTaskCompletion(id) {
    // Find the task by id and toggle its completed status
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        // Re-render the task list
        renderTasks();
    }   
}

// Function to remove a task
function removeTask(id) {
    // Filter out the task with the given id
    tasks = tasks.filter(task => task.id !== id);
    // Re-render the task list
    renderTasks();
}

document.getElementById('addTaskBtn').onclick = addTask;
document.getElementById('taskInput').onkeypress = function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
};
// Initial render of the task list
renderTasks();

window.onbeforeunload = () => {
    // Save tasks to local storage before the page unloads
    save();
}

save = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage when the page loads
window.onload = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}