// Set up references to DOM elements
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
// Define function to add a new task
function addTask () {
    // Get the task text and trim whitespace
    const taskText = newTaskInput.value.trim();
    // Only add the task if the input is not empty
    if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.className = 'listItem';
        // Apply highlight class to every other item (even indices: 1, 3, 5...)
        if (taskList.children.length % 2 === 1) listItem.classList.add('highlight');
        // Create the task item with checkbox, timestamp, and delete button
        listItem.innerHTML = `
            <div class="listItem-content">
                <input type="checkbox"> 
                <div>
                    <strong>${taskText}</strong><br>
                    <small style="opacity: 0.7;">${new Date().toLocaleString()}</small>
                </div>
            </div>
            <button onclick="this.parentElement.remove()">Delete</button>
        `;
        // Append the new task to the task list
        taskList.appendChild(listItem);
        // Clear the input field for the next task
        newTaskInput.value = '';
        newTaskInput.focus();
    }
};
// Add event listener to the input field to allow adding tasks with the Enter key
newTaskInput.addEventListener('keydown', function(event) {'Enter'===event.key&&addTask()});