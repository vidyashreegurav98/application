document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    // Event listener for adding tasks
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, priority: 'low', completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    });

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})">
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <select onchange="changePriority(${index}, this)">
                    <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                    <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                </select>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to toggle task completion
    window.toggleCompletion = function(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Function to edit task
    window.editTask = function(index) {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    // Function to delete task
    window.deleteTask = function(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    // Function to change task priority
    window.changePriority = function(index, selectElement) {
        tasks[index].priority = selectElement.value;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };
});
