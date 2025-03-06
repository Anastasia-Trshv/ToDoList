// Инициализация состояния
let tasks = [];
let currentFilter = 'all'; // По умолчанию показываем все задачи

// Чистая функция для добавления задачи
const addTask = (tasks, taskText) => {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    return [...tasks, newTask];
};

// Чистая функция для отметки задачи как выполненной
const toggleTaskCompletion = (tasks, taskId) => {
    return tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
};

// Чистая функция для удаления задачи
const deleteTask = (tasks, taskId) => {
    return tasks.filter(task => task.id !== taskId);
};

// Чистая функция для фильтрации задач по статусу
const filterTasks = (tasks, filter) => {
    switch (filter) {
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'uncompleted':
            return tasks.filter(task => !task.completed);
        case 'all':
        default:
            return tasks;
    }
};

// Функция для рендеринга задач
const renderTasks = () => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Фильтруем задачи в зависимости от текущего фильтра
    const filteredTasks = filterTasks(tasks, currentFilter);

    // Рендерим отфильтрованные задачи
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Добавляем класс, если задача выполнена
        if (task.completed) {
            li.classList.add('completed');
        }

        // Кнопка "Выполнено"
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Не выполнено' : 'Выполнено';
        completeBtn.classList.add('complete-btn');
        completeBtn.onclick = () => {
            tasks = toggleTaskCompletion(tasks, task.id);
            renderTasks(); // Перерисовываем список
        };

        // Кнопка "Удалить"
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            renderTasks(); // Перерисовываем список
        };

        // Добавляем кнопки в элемент задачи
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        // Добавляем задачу в список
        taskList.appendChild(li);
    });
};

// Обработчики событий
document.getElementById('addTaskBtn').onclick = () => {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() !== '') {
        tasks = addTask(tasks, taskInput.value.trim());
        taskInput.value = '';
        renderTasks(); // Перерисовываем список с учётом текущего фильтра
    }
};

document.getElementById('showAll').onclick = () => {
    currentFilter = 'all';
    renderTasks();
};

document.getElementById('showCompleted').onclick = () => {
    currentFilter = 'completed';
    renderTasks();
};

document.getElementById('showUncompleted').onclick = () => {
    currentFilter = 'uncompleted';
    renderTasks();
};

// Инициализация
renderTasks();