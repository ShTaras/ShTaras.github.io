let taskTemp;
let todoList = [];

let inputTask = document.getElementById('taskText');
let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener("click", addTask);


if (!(localStorage.getItem(`todo`) === null)) {
    loadTasks();
    print();
}


function loadTasks() {
    todoList = JSON.parse(localStorage.getItem('todo'));
}

function addTask() {
    if (isNotEmpty()) {
        initTask();
        saveNew();
        print();
    } else
        alert('Task is empty');
}

function isNotEmpty() {
    return inputTask.value !== '';
}

// function initDate() {
//     let date = new Date();
//     let taskDate = {};
//     taskDate.day = date.getDay();
//     taskDate.month = date.getMonth() + 1;
//     taskDate.year = date.getFullYear();
//
//
//     if (taskDate.day < 10) taskDate.day = '0' + taskDate.day;
//     if (taskDate.month < 10) taskDate.month = '0' + taskDate.month;
//
//
//     return taskDate;
// }
function timeToPrint(task) {
    let hours = new Date(task.date).getHours(),
        minutes = new Date(task.date).getHours();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return hours + ':' + minutes;

}

function dateToPrint(task) {
    let day=new Date(task.date).getDay(),
        month=new Date(task.date).getMonth();
    if (day < 10) day = ('0' + day);
    if (month < 10) month = '0' +(month + 1);
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
    todoList.unshift(taskTemp);
    localStorage.setItem('todo', JSON.stringify(todoList));
}

function saveAll() {
    localStorage.setItem('todo', JSON.stringify(todoList));
}

function createID() {
    let date = new Date();
    return `f${(+date).toString(16)}`;
}

function print() {
    let oldTasks = document.querySelectorAll('.task');
    for (let i = 1; i < oldTasks.length; i++) {
        oldTasks[i].remove();
    }
    for (let i = 0; i < todoList.length; i++) {
        let newTask = document.querySelector('.task-empty').cloneNode(true);
        for (let key in todoList[i]) {

             newTask.querySelector('.task__date').innerHTML = dateToPrint(todoList[i]);
            newTask.querySelector('.task__time').innerHTML = timeToPrint(todoList[i]);
            newTask.querySelector('.task__importance').innerHTML = todoList[i].importance;
            newTask.querySelector('.task__text').innerHTML = '<p>' + todoList[i].taskText + '</p>'
            newTask.id = todoList[i].taskID;
            if (todoList[i].check === true) {
                newTask.classList.add('task-complete');
            }
        }
        newTask.classList.remove('task-empty');
        document.getElementById('tasks').appendChild(newTask);
        //newTask.addEventListener("click", changeStatus);

        newTask.addEventListener("click", changeStatus);

    }

}


function deleteTask(taskID) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].taskID === taskID) {
            todoList.splice(i, 1);
        }
    }
    saveAll();
    print();
}

function checkTask(taskID) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].taskID === taskID) {
            todoList[i].check = todoList[i].check !== true;
        }
    }
    saveAll();
    print();
}

function editTask(taskID, newTaskText) {

    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].taskID === taskID) {
            todoList[i].taskText = newTaskText;
        }
    }
    saveAll();
    print();
}

function showDltMsg(taskID) {
    let DltMsg = {
        todo: document.getElementById('todoList'),
        window: document.createElement('div'),
        btnYes: document.createElement('button'),
        btnNo: document.createElement('button'),
        close: function () {
            DltMsg.todo.style.opacity = '1';
            DltMsg.todo.style.pointerEvents = 'All';
            document.body.removeChild(DltMsg.window);
        }
    }

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

// function closeDltMsg(DltMsg) {
//
//
// }

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

