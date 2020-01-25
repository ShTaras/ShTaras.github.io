let taskTemp;
let todoList = [];

let inputTask = document.getElementById('taskText');
let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener("click", addTask);
document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        addTask();
    }
});


if (!(localStorage.getItem(`todo`) === null)) {
    loadTasks();
    todoList.forEach(printTask);
}


function loadTasks() {
    todoList = JSON.parse(localStorage.getItem('todo'));
}

function addTask() {
    if (inputTask.value !== '') {
        initTask();
        saveNew();
    } else
        alert('Task is empty');
}

function timeToPrint(task) {
    let hours = new Date(task.date).getHours(),
        minutes = new Date(task.date).getMinutes();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return hours + ':' + minutes;

}

function dateToPrint(task) {
    let day = new Date(task.date).getDay(),
        month = new Date(task.date).getMonth();
    if (day < 10) day = ('0' + day);
    if (month < 10) month = '0' + (month + 1);
    return day + '.' + month + '.' + new Date(task.date).getFullYear();
}

function initTask() {
    taskTemp = {
        date: new Date(),
        importance: 1,
        taskText: inputTask.value,
        check: false,
        taskID: createID()
    };
    inputTask.value = "";
}

function saveNew() {
    printTask(todoList[todoList.push(taskTemp) - 1]);
    localStorage.setItem('todo', JSON.stringify(todoList));
}

function saveAll() {
    localStorage.setItem('todo', JSON.stringify(todoList));
}

function createID() {
    let date = new Date();
    return `f${(+date).toString(16)}`;
}

function printTask(item) {

    let newTask = document.querySelector('.task-empty').cloneNode(true);
    let tasks = document.getElementById('tasks');
    newTask.querySelector('.task__date').innerHTML = dateToPrint(item);
    newTask.querySelector('.task__time').innerHTML = timeToPrint(item);
    newTask.querySelector('.task__importance').innerHTML = item.importance;
    newTask.querySelector('.task__text').innerHTML = '<p>' + item.taskText + '</p>'
    newTask.id = item.taskID;
    if (item.check === true) {
        newTask.classList.add('task-complete');
    }

    newTask.classList.remove('task-empty');
    tasks.insertBefore(newTask, tasks.firstChild);
    newTask.addEventListener("click", changeStatus);
}

function deleteTask(taskID) {
    let index = todoList.findIndex(function (element) {
        if (element.taskID === taskID) {
            return true;
        }
    });
    todoList.splice(index, 1);
    document.getElementById('tasks').removeChild(document.getElementById(taskID));
    saveAll();

}

function checkTask(taskID) {
    todoList.find(function (index) {
            if (index.taskID === taskID) {
                index.check = index.check !== true;
            }
        }
    );
    document.getElementById(taskID).classList.toggle('task-complete');
    saveAll();
}

function editTask(taskID, newTaskText) {
    todoList.find(function (element) {
            if (element.taskID === taskID) {
                element.taskText = newTaskText;
                let task = document.getElementById(taskID);
                console.log(task);
                task.querySelector('.task__text').innerHTML = newTaskText;
            }
        }
    );
    saveAll();
}

function changeStatus() {
    let taskID = this.id;
    let target = event.target;

    switch (target.className) {
        case 'task__btnCheck':
            checkTask(taskID);
            break;
        case 'task__btnDelete':
            showDltMsg(taskID);
            break;
        case 'task__btnEdit':
            showEditWindow(taskID);
            break;
        default:
            break;
    }
}

function showDltMsg(taskID) {
    let DltMsg = {
        window: document.createElement('div'),
        btnYes: document.createElement('button'),
        btnNo: document.createElement('button'),
        close: function () {
            DltMsg.todo.style.opacity = '1';
            DltMsg.todo.style.pointerEvents = 'All';
            document.body.removeChild(DltMsg.window);
        }
    }
    DltMsg.todo = document.getElementById('todoList')

    DltMsg.window.className = 'deleteWindow';
    DltMsg.btnNo.className = 'deleteWindow__btnYn';
    DltMsg.btnNo.innerHTML = 'No';

    DltMsg.btnYes.className = 'deleteWindow__btnYn';
    DltMsg.btnYes.innerHTML = 'Yes';

    DltMsg.todo.style.opacity = '0.5';
    DltMsg.todo.style.pointerEvents = 'none';
    document.body.appendChild(DltMsg.window);
    DltMsg.window.innerHTML = '<p class="deleteWindow__notice">Delete item?</p>';
    DltMsg.window.appendChild(DltMsg.btnNo);
    DltMsg.window.appendChild(DltMsg.btnYes);

    DltMsg.btnNo.addEventListener('click', DltMsg.close);
    DltMsg.btnYes.addEventListener('click', function () {
        deleteTask(taskID);
        DltMsg.close();
    });
}

function showEditWindow(taskID) {
    let editWindow = {
        todo: document.getElementById('todoList'),
        window: document.createElement('div'),
        textArea: document.createElement('textarea'),
        btnCancel: document.createElement('button'),
        btnSave: document.createElement('button'),
        close: function () {
            editWindow.todo.style.opacity = '1';
            editWindow.todo.style.pointerEvents = 'All';
            document.body.removeChild(editWindow.window);
        }
    }
    editWindow.window.className = 'editWindow';

    editWindow.btnCancel.className = 'editWindow__btnCancel';
    editWindow.btnCancel.innerHTML = 'CANCEL';

    editWindow.btnSave.className = 'editWindow__btnSave';
    editWindow.btnSave.innerHTML = 'SAVE';

    editWindow.textArea.className = 'editWindow__newTextTask';
    editWindow.textArea.innerHTML = '';
    editWindow.textArea.placeholder = 'New text of todo item';

    editWindow.todo.style.opacity = '0.5';
    editWindow.todo.style.pointerEvents = 'none';

    document.body.appendChild(editWindow.window);
    editWindow.window.innerHTML = '<p class="editWindow__notice">Edit text</p>';
    editWindow.window.appendChild(editWindow.textArea);
    editWindow.window.appendChild(editWindow.btnCancel);
    editWindow.window.appendChild(editWindow.btnSave);

    editWindow.btnCancel.addEventListener('click', editWindow.close);
    editWindow.btnSave.addEventListener('click', function () {
        let newTaskText = editWindow.textArea.value;
        editTask(taskID, newTaskText);
        editWindow.close();
    })

}



