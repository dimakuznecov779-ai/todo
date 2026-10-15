// Получение элементов
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Ключ для localStorage
const STORAGE_KEY = 'tasks';

// Загрузка задач из localStorage
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Сохранение задач в localStorage
const saveTasks = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Отрисовка одной задачи
const renderTask = (task) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task');
  if (task.completed) taskItem.classList.add('completed');

  taskItem.innerHTML = `
    <span>${task.text}</span>
    <button type="button" class="delete-btn">Удалить</button>
  `;

  // Отметка задачи
  taskItem.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      task.completed = !task.completed;
      taskItem.classList.toggle('completed');
      saveTasks(); // ← сохраняем изменение
    }
  });

  // Удаление задачи
  const deleteBtn = taskItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    tasks = tasks.filter(t => t.id !== task.id); // удаляем из массива
    taskList.removeChild(taskItem);
    saveTasks(); // ← сохраняем изменение
  });

  taskList.appendChild(taskItem);
};

// Отрисовка всех задач при загрузке
tasks.forEach(renderTask);

// Добавление задачи
const addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    id: Date.now(),         // уникальный id
    text: taskText,
    completed: false
  };

  tasks.push(newTask);      // добавляем в массив
  renderTask(newTask);      // рисуем в DOM
  saveTasks();              // ← сохраняем

  taskInput.value = '';
};

// Обработчики
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});
