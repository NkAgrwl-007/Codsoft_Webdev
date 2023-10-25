document.addEventListener('DOMContentLoaded', function () {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const showTasksBtn = document.getElementById('showTasksBtn');
    const showCompletedBtn = document.getElementById('showCompletedBtn');
    const taskInputContainer = document.getElementById('taskInputContainer');
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskListContainer = document.getElementById('taskListContainer');
    const taskList = document.getElementById('taskList');
    const completedTasksContainer = document.getElementById('completedTasksContainer');
    const completedTasks = document.getElementById('completedTasks');

    if (localStorage.getItem('tasks')) {
        taskList.innerHTML = localStorage.getItem('tasks');
    }

    if (localStorage.getItem('completedTasks')) {
        completedTasks.innerHTML = localStorage.getItem('completedTasks');
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', taskList.innerHTML);
        localStorage.setItem('completedTasks', completedTasks.innerHTML);
    }

    function addTask() {
        if (taskInput.value.trim() !== '') {
            taskList.innerHTML += `<li><span>${taskInput.value}</span><button class="delete">X</button><button class="complete">✓</button></li>`;
            taskInput.value = '';
            updateLocalStorage();
            alert('Task added successfully! 🎉');
        }
    }

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function deleteTask(task) {
        task.remove();
        updateLocalStorage();
    }

    function completeTask(task) {
        const completedTasksList = document.getElementById('completedTasks');
        const taskText = task.querySelector('span').textContent;
        const newCompletedTask = document.createElement('li');
        newCompletedTask.innerHTML = `<span>${taskText}</span><button class="delete">X</button><button class="rewind">↩</button>`;
        completedTasksList.appendChild(newCompletedTask);
        task.remove();
        updateLocalStorage();
    }

    function editTask(taskText) {
        const newTaskText = prompt('Edit task:', taskText);
        return newTaskText !== null ? newTaskText : taskText;
    }
    
    function deleteCompletedTask(task) {
        task.remove();
        updateLocalStorage();
    }

    function rewindCompletedTask(task) {
        taskList.innerHTML += `<li><span>${task.firstChild.textContent}</span><button class="delete">X</button><button class="complete">✓</button></li>`;
        task.remove();
        updateLocalStorage();
    }

    completedTasks.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('delete')) {
            deleteCompletedTask(target.parentElement);
        } else if (target.classList.contains('rewind')) {
            rewindCompletedTask(target.parentElement);
        }
    });

    taskList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('delete')) {
            deleteTask(target.parentElement);
        } else if (target.classList.contains('complete')) {
            completeTask(target.parentElement);
        } else if (target.tagName === 'SPAN') {
            const taskText = target.innerText.trim();
            target.innerText = editTask(taskText);
            updateLocalStorage();
        }
    });

    completedTasks.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('delete')) {
            deleteTask(target.parentElement.parentElement);
        } else if (target.classList.contains('rewind')) {
            const taskText = target.parentElement.parentElement.cells[0].innerText;
            taskList.innerHTML += `<li><span>${taskText}</span><button class="delete">X</button><button class="complete">✓</button></li>`;
            deleteTask(target.parentElement.parentElement);
            updateLocalStorage();
        }
    });

    addTaskBtn.addEventListener('click', function () {
        taskInputContainer.style.display = 'flex';
        taskListContainer.style.display = 'none';
        completedTasksContainer.style.display = 'none';
    });

    showTasksBtn.addEventListener('click', function () {
        taskInputContainer.style.display = 'none';
        taskListContainer.style.display = 'block';
        completedTasksContainer.style.display = 'none';
    });

    showCompletedBtn.addEventListener('click', function () {
        taskInputContainer.style.display = 'none';
        taskListContainer.style.display = 'none';
        completedTasksContainer.style.display = 'block';
    });
    document.getElementById('clearLocalData').addEventListener('click', function() {
        localStorage.clear();
        location.reload();
    });
});
