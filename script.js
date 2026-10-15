// Получение элементов
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Добавление задачи
const addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskItem = document.createElement('li');
  taskItem.classList.add('task');
  taskItem.innerHTML = `
  <span>${taskText}</span>
  <button type="button" class="delete-btn">Удалить</button>
  `;

  // Добавление функциональности отметки задачи
  taskItem.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      taskItem.classList.toggle('completed');
    }
  });

  // Удаление задачи
  const deleteBtn = taskItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    taskList.removeChild(taskItem);
  });

  taskList.appendChild(taskItem);
  taskInput.value = '';
};

// Обработчик на кнопку "Добавить"
addTaskBtn.addEventListener('click', addTask);

// Добавление задачи по нажатию Enter
taskInput.addEventListener('keydown',(e) => {
  if (e.key === 'Enter') addTask();
});