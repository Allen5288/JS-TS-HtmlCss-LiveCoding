// Task Manager App

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const statusFilter = document.getElementById('statusFilter');
const searchInput = document.getElementById('searchInput');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');
const activeTasksSpan = document.getElementById('activeTasks');

// Task data
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingTaskId = null;

// Initialize the app
function init() {
    renderTasks();
    updateStats();
    
    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    statusFilter.addEventListener('change', renderTasks);
    searchInput.addEventListener('input', renderTasks);
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;
    
    if (editingTaskId !== null) {
        // Update existing task
        const taskIndex = tasks.findIndex(task => task.id === editingTaskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].text = taskText;
            editingTaskId = null;
            addTaskBtn.textContent = 'Add Task';
        }
    } else {
        // Add new task
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date()
        };
        tasks.unshift(newTask); // Add to the beginning of the array
    }
    
    saveTasks();
    taskInput.value = '';
    renderTasks();
}

// Edit a task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        editingTaskId = id;
        taskInput.value = task.text;
        taskInput.focus();
        addTaskBtn.textContent = 'Update Task';
    }
}

// Delete a task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Toggle task completion status
function toggleTaskStatus(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
    }
}

// Render tasks based on filters
function renderTasks() {
    const filterValue = statusFilter.value;
    const searchValue = searchInput.value.toLowerCase();
    
    // Filter tasks based on status and search term
    const filteredTasks = tasks.filter(task => {
        const matchesStatus = filterValue === 'all' || 
                             (filterValue === 'completed' && task.completed) || 
                             (filterValue === 'active' && !task.completed);
        
        const matchesSearch = task.text.toLowerCase().includes(searchValue);
        
        return matchesStatus && matchesSearch;
    });
    
    // Clear the list
    taskList.innerHTML = '';
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li class="empty-message">No tasks found</li>';
        return;
    }
    
    // Append task items to the list
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" 
                ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${escapeHTML(task.text)}</span>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        // Checkbox event
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTaskStatus(task.id));
        
        // Edit button event
        const editBtn = taskItem.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editTask(task.id));
        
        // Delete button event
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskList.appendChild(taskItem);
    });
    
    updateStats();
}

// Update task statistics
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const activeTasks = totalTasks - completedTasks;
    
    totalTasksSpan.textContent = totalTasks;
    completedTasksSpan.textContent = completedTasks;
    activeTasksSpan.textContent = activeTasks;
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Escape HTML to prevent XSS attacks
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[tag]));
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);