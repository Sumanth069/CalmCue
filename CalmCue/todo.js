const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  todoList.innerHTML = tasks
    .map((task, index) => `
      <li>
        <span>${task}</span>
        <button onclick="deleteTask(${index})">Delete</button>
      </li>
    `)
    .join('');
}

function addTask(event) {
  event.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    todoInput.value = '';
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

todoForm.addEventListener('submit', addTask);

// Render tasks on page load
renderTasks();