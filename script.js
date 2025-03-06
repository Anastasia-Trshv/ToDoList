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

// Функция для рендеринга задач
const renderTasks = (tasks) => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
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
            renderTasks(tasks);
        };

        // Кнопка "Удалить"
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            renderTasks(tasks);
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
        renderTasks(tasks);
    }
};

// Инициализация
renderTasks(tasks);