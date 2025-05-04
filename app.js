// API URL
const API_URL = 'http://localhost:8000/todos';
// DOM Elements
const todoInput = document.getElementById('new-todo');
const addButton = document.getElementById('add-btn');
const todosList = document.getElementById('todos-list');

// Event Listeners
document.addEventListener('DOMContentLoaded', fetchTodos);
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Fetch all todos from the API
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Render todos to the DOM
function renderTodos(todos) {
    todosList.innerHTML = '';
    
    if (todos.length === 0) {
        todosList.innerHTML = '<li class="empty-list">No todos yet. Add one!</li>';
        return;
    }
    
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = `todo-item ${todo.done ? 'completed' : ''}`;
        todoItem.dataset.id = todo.id;
        
        todoItem.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.done ? 'checked' : ''}>
            <span class="todo-text">${todo.task}</span>
            <button class="delete-btn">Delete</button>
        `;
        
        // Add event listeners to the todo item
        const checkbox = todoItem.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        
        const deleteBtn = todoItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        todosList.appendChild(todoItem);
    });
}

// Add a new todo
async function addTodo() {
    const task = todoInput.value.trim();
    
    if (!task) {
        alert('Please enter a task!');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });
        
        const newTodo = await response.json();
        todoInput.value = '';
        
        // Refresh the todo list
        fetchTodos();
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// Toggle todo status
async function toggleTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const updatedTodo = await response.json();
        
        // Update the UI for the specific todo
        const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
        if (todoItem) {
            todoItem.classList.toggle('completed', updatedTodo.done);
            const checkbox = todoItem.querySelector('.todo-checkbox');
            checkbox.checked = updatedTodo.done;
        }
    } catch (error) {
        console.error('Error toggling todo:', error);
    }
}

// Delete a todo
async function deleteTodo(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        // Remove the todo from the UI
        const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
        if (todoItem) {
            todoItem.remove();
            
            // Check if there are any todos left
            if (todosList.children.length === 0) {
                todosList.innerHTML = '<li class="empty-list">No todos yet. Add one!</li>';
            }
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
} 