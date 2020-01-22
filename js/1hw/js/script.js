let taskTemp;
let todoList = [];

let inputTask = document.getElementById('taskText');
let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener("click", addTask);


if (localStorage.getItem('todo') != undefined) {
    loadTasks();
    print();
}


function loadTasks() {
    todoList = JSON.parse(localStorage.getItem('todo'));
}

function addTask() {
    initTask();
    save();
    print();
}

function initDate() {
    let date = new Date();
    let taskDate = {};
    taskDate.day = date.getDay();
    taskDate.month = date.getMonth() + 1;
    taskDate.year = date.getFullYear();
    taskDate.hours = date.getHours();
    taskDate.minutes = date.getMinutes();

    if (taskDate.day < 10) taskDate.day = '0' + taskDate.day;
    if (taskDate.month < 10) taskDate.month = '0' + taskDate.month;
    if (taskDate.hours < 10) taskDate.hours = '0' + taskDate.hours;
    if (taskDate.minutes < 10) taskDate.minutes = '0' + taskDate.minutes;

    return taskDate;
}

function initTask() {


    let taskDate = initDate();
    taskTemp = {};
    taskTemp.dateInfo = taskDate.day + '.' + taskDate.month + '.' + taskDate.year;
    taskTemp.timeInfo = taskDate.hours + ':' + taskDate.minutes;
    taskTemp.importance = 1;
    taskTemp.taskText = inputTask.value;
    taskTemp.check = false;
    taskTemp.taskID = createID();
    inputTask.value = "";
}

function save() {
    todoList[todoList.length] = taskTemp;
    localStorage.setItem('todo', JSON.stringify(todoList));
}

function createID() {
    let date = new Date();
    let id = `f${(+date).toString(16)}`;
    return id;
}

function print() {
    let oldTasks = document.querySelectorAll('.task');
    for (let i = 1; i < oldTasks.length; i++) {
        oldTasks[i].remove();
    }
    for (let i = 0; i < todoList.length; i++) {
        let newTask = document.querySelector('.task-empty').cloneNode(true);
        for (let key in todoList[i]) {
            newTask.querySelector('.task__date').innerHTML = todoList[i].dateInfo
            newTask.querySelector('.task__time').innerHTML = todoList[i].timeInfo;
            newTask.querySelector('.task__importance').innerHTML = todoList[i].importance;
            newTask.querySelector('.task__text').innerHTML = todoList[i].taskText;
            newTask.id = todoList[i].taskID;
            if (todoList[i].check === true) {
                newTask.classList.add('task-complete');
            }
        }
        newTask.classList.remove('task-empty');
        document.getElementById('todoList').appendChild(newTask);
        //newTask.addEventListener("click", changeStatus);

        addBtnEvent(newTask);
    }

}

function addBtnEvent(newTask) {
    newTask.addEventListener("click", changeStatus);
    newTask.addEventListener("click", showDltMsg);
}

function deleteTask() {

    let target = event.target;
    if (target.className === 'task__btnDelete') {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].taskID === this.id) {
                todoList.splice(i, 1);
            }
        }
    }
    localStorage.setItem('todo', JSON.stringify(todoList));
    print();
}

function showDltMsg() {
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
        deleteTask();
        DltMsg.close();
    });


}

// function closeDltMsg(DltMsg) {
//
//
// }

function changeStatus() {

    let target = event.target;
    if (target.className === 'task__btnCheck') {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].taskID === this.id) {
                todoList[i].check = true;
            }
        }
    }
    localStorage.setItem('todo', JSON.stringify(todoList));
    print();
}

