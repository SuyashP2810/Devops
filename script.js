const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

let todos = [
  { id: 1, text: 'Finish project setup', completed: false },
  { id: 2, text: 'Review design mockup', completed: true },
  { id: 3, text: 'Prepare meeting notes', completed: false }
];

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  todos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    const main = document.createElement('div');
    main.className = 'todo-main';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `Mark ${todo.text} as complete`);
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.setAttribute('aria-label', `Delete ${todo.text}`);
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    main.appendChild(checkbox);
    main.appendChild(text);
    item.appendChild(main);
    item.appendChild(deleteBtn);
    todoList.appendChild(item);
  });
}

function addTodo(event) {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) {
    todoInput.focus();
    return;
  }

  todos.unshift({
    id: Date.now(),
    text,
    completed: false
  });

  todoInput.value = '';
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

todoForm.addEventListener('submit', addTodo);
renderTodos();
