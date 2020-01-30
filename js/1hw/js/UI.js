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
    let todo = document.getElementById('todoList')
    DltMsg.window.className = 'deleteWindow animated bounceInUp fast';
    DltMsg.btnNo.className = 'deleteWindow__btnYn';
    DltMsg.btnNo.innerHTML = 'No';
    DltMsg.btnYes.className = 'deleteWindow__btnYn';
    DltMsg.btnYes.innerHTML = 'Yes';
  //  todo.style.opacity = '0.5';
  //  todo.style.pointerEvents = 'none';
    todo.style.userSelect = 'none';
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
    editWindow.todo.style.userSelect = 'none';
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