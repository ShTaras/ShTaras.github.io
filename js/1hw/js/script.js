let todoList = [];
let temp;


if (localStorage.getItem('todo') != undefined) {
    todoList = JSON.parse(localStorage.getItem('todo'));

    printTasks();
}
document.getElementById('btnAdd').onclick = function () {

    temp = {};
    let d = document.getElementById('taskText').value;
    let date = new Date();
    let day = date.getDay(),
        month = date.getMonth() + 1,
        hours = date.getHours(),
        minutes = date.getMinutes();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    temp.dateInfo = day + '.' + month + '.' + date.getFullYear();
    temp.timeInfo = hours + ':' + minutes;
    temp.importance = 1;
    temp.taskText = d;
    temp.check = false;
    temp.taskID = `f${(+date).toString(16)}`;

    let i = todoList.length;
    todoList[i] = temp;

    localStorage.setItem('todo', JSON.stringify(todoList));
    printTasks();
    console.log(todoList);

}


function printTasks() {
    let oldTasks = document.querySelectorAll('.task');
    for (let i = 1; i < oldTasks.length; i++) {
        oldTasks[i].remove();
    }
    for (let pair of todoList.entries()) {

        let newTask = document.querySelector('.task-empty').cloneNode(true);

        for (let key in pair) {
            newTask.querySelector('.task__date').innerHTML = pair[key].dateInfo
            newTask.querySelector('.task__time').innerHTML = pair[key].timeInfo;
            newTask.querySelector('.task__importance').innerHTML = pair[key].importance;
            newTask.querySelector('.task__text').innerHTML = pair[key].taskText;
            newTask.id = pair[key].taskID;
            if(pair[key].check===true){
                newTask.classList.add('task-complete');
            }
        }

        newTask.classList.remove('task-empty');
        document.getElementById('todoList').appendChild(newTask);
        newTask.addEventListener("click", changeStatus);

    }

}


function changeStatus() {

    let target = event.target;
    if (target.className === 'task__btnCheck') {
        for(let i = 0 ; i< todoList.length ; i++){
            if(todoList[i].taskID=== this.id){
                todoList[i].check= true;
            }
        }
    }
    localStorage.setItem('todo', JSON.stringify(todoList));
    printTasks();
}

