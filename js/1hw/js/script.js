window.onload = function () {
    let taskTemp,
        todoList = [];

    const inputTask = document.getElementById('taskText'),
        btnAdd = document.getElementById('btnAdd').addEventListener("click", addTask),
        btnSortDate = document.getElementById('sortDate').addEventListener("click", sortDate),
        btnSortPriority = document.getElementById('sortPriority').addEventListener('click', sortPriority),
        btnSortCheck = document.getElementById('sortCheck').addEventListener('click', sortCheck),
        inputSearch = document.getElementById('inputSearch').addEventListener('input', findTask);

    let statusSortDate = false,
        statusSortCheck = false,
        statusSortPriority = true;

    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            addTask();
        }
    });

    if (!(localStorage.getItem(`todo`) === null)) {
        loadTasks();
        sortPriority();
    }

    function printAllTask(array) {
        array.forEach(printTask);
    }

    function loadTasks() {
        todoList = JSON.parse(localStorage.getItem('todo'));
    }

    function addTask() {
        if (inputTask.value !== '') {
            initTask();
            saveNew();
        }
    }

    function timeToPrint(task) {
        let hours = new Date(task.date).getHours(),
            minutes = new Date(task.date).getMinutes();
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        return hours + ':' + minutes;
    }

    function dateToPrint(task) {
        let day = new Date(task.date).getDate(),
            month = new Date(task.date).getMonth();
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + (month + 1);
        return day + '.' + month + '.' + new Date(task.date).getFullYear();
    }

    function initTask() {
        taskTemp = {
            date: new Date(),
            importance: 1,
            taskText: inputTask.value,
            check: false,
            taskID: createID(),
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
        let tasks = document.getElementById('tasks');
        let newTask = document.querySelector('.task-empty').cloneNode(true);
        newTask.querySelector('.task__date').innerHTML = dateToPrint(item);
        newTask.querySelector('.task__time').innerHTML = timeToPrint(item);
        newTask.querySelector('.task__importance').innerHTML = item.importance;
        newTask.querySelector('.task__text').innerHTML = '<p>' + item.taskText + '</p>'
        newTask.id = item.taskID;
        if (item.check === true) newTask.classList.add('task-complete');
        newTask.classList.remove('task-empty');
        newTask.classList.add('task');
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
        document.getElementById(taskID).classList.add('fadeOutLeft');
        setTimeout(function () {
            document.getElementById('tasks').removeChild(document.getElementById(taskID))
        }, 600);

        saveAll();
    }

    function checkTask(taskID) {
        todoList.find(function (element) {
                if (element.taskID === taskID) element.check = element.check !== true;
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
                    task.querySelector('.task__text').innerHTML = newTaskText;
                }
            }
        );
        saveAll();
    }

    function importanceUp(taskID) {
        todoList.find(function (element) {
                if (element.taskID === taskID) {
                    if (element.importance < 5) element.importance++;
                    let task = document.getElementById(taskID);
                    task.querySelector('.task__importance').innerHTML = element.importance;
                }
            }
        )
        saveAll();
    }

    function importanceDown(taskID) {
        todoList.find(function (element) {
                if (element.taskID === taskID) {
                    if (element.importance > 1) element.importance--;
                    let task = document.getElementById(taskID);
                    task.querySelector('.task__importance').innerHTML = element.importance;
                }
            }
        )
        saveAll();
    }

    function changeStatus() {
        let taskID = this.id;
        let target = event.target;
        switch (target.className) {
            case 'task__btnCheck taskBtn':
                checkTask(taskID);
                break;
            case 'task__btnDelete taskBtn':
                showDltMsg(taskID);
                break;
            case 'task__btnEdit taskBtn':
                showEditWindow(taskID);
                break;
            case 'task__arrowUp':
                importanceUp(taskID);
                break;
            case 'task__arrowDown':
                importanceDown(taskID);
                break;
            default:
                break;
        }
    }

    function clearPrint() {
        let task = document.querySelectorAll('.task');
        task.forEach(function (element) {
            element.remove();
        })
    }

    function sortDate() {
        if (statusSortDate === false) {
            todoList.sort(function (elementPrev, elementNext) {
                let prevDate = new Date(elementPrev.date),
                    NextDate = new Date(elementNext.date);
                return NextDate - prevDate;
            })
            statusSortDate = true;
        } else {
            todoList.sort(function (elementPrev, elementNext) {
                let prevDate = new Date(elementPrev.date),
                    NextDate = new Date(elementNext.date);
                return prevDate - NextDate;
            })
            statusSortDate = false;
        }
        saveAll();
        clearPrint();
        printAllTask(todoList);
    }

    function sortPriority() {
        if (statusSortPriority === false) {
            todoList.sort(function (elementPrev, elementNext) {
                return elementNext.importance - elementPrev.importance;
            })
            statusSortPriority = true;
        } else {
            todoList.sort(function (elementPrev, elementNext) {
                return elementPrev.importance - elementNext.importance;
            })
            statusSortPriority = false;
        }
        saveAll();
        clearPrint();
        printAllTask(todoList);

    }

    function sortCheck() {
        if (statusSortCheck === false) {
            todoList.sort(function (elementPrev, elementNext) {
                return elementNext.check - elementPrev.check;
            })
            statusSortCheck = true;
        } else {
            todoList.sort(function (elementPrev, elementNext) {
                return elementPrev.check - elementNext.check;
            })
            statusSortCheck = false;
        }
        saveAll();
        clearPrint();
        printAllTask(todoList);

    }

    function findTask() {
        let findInput = this.value;
        let todoListFind = todoList.filter(function (element) {
            if (element.taskText.indexOf(findInput) >= 0) return true;
        });
        if (todoListFind.length !== 0) {
            clearPrint();
            printAllTask(todoListFind);
        } else if (findInput === '') {
            clearPrint();
            printAllTask(todoList);
        } else {
            clearPrint();
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
        DltMsg.window.className = 'deleteWindow animated bounceInUp fast';
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
        editWindow.window.className = 'editWindow  animated bounceInDown fast';
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
        });
    }
}




