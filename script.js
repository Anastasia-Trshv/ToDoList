// Инициализация состояния
let tasks = [];

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
            return tasks; // Возвращаем все задачи, если фильтр "all" или неизвестен
    }
};

// Функция для рендеринга задач
const renderTasks = (tasks) => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            renderTasks(tasks);
        };
        li.onclick = () => {
            tasks = toggleTaskCompletion(tasks, task.id);
            renderTasks(tasks);
        };
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
};

// Обработчики событий
document.getElementById('addTaskBtn').onclick = () => {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() !== '') {
        tasks = addTask(tasks, taskInput.value.trim());
        taskInput.value = '';
        renderTasks(tasks);
    }
};

document.getElementById('showAll').onclick = () => {
    renderTasks(filterTasks(tasks, 'all')); // Фильтр "all"
};

document.getElementById('showCompleted').onclick = () => {
    renderTasks(filterTasks(tasks, 'completed')); // Фильтр "completed"
};

document.getElementById('showUncompleted').onclick = () => {
    renderTasks(filterTasks(tasks, 'uncompleted')); // Фильтр "uncompleted"
};

// Инициализация
renderTasks(tasks);