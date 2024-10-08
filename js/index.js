let inputMassege = document.getElementById("inputMassege");
let inputList = [];
let doneList = [];

// Load tasks from localStorage if available
if (localStorage.getItem("taskList") !== null) {
    inputList = JSON.parse(localStorage.getItem("taskList"));
    displayData(); // Display the loaded tasks
}

if (localStorage.getItem("doneList") !== null) {
    doneList = JSON.parse(localStorage.getItem("doneList"));
    displayDataDone(); // Display the loaded done tasks
}

function addInput() {
    let massege = {
        input: inputMassege.value,
    };

    if (massege.input.length >= 3) {  // Ensure the task has at least 3 characters
        inputList.push(massege);
        localStorage.setItem("taskList", JSON.stringify(inputList)); // Save to localStorage
        inputMassege.value = '';  // Clear the input field after adding the task
        displayData();
    } else {
        alert('Task should be at least 3 characters long.');
    }
}

function displayData() {
    let taskList = document.getElementById("task-list");
    let taskCount = document.getElementById("task-count");

    taskList.innerHTML = '';  // Clear the current list before adding the new tasks

    inputList.forEach((task, index) => {
        let li = document.createElement('li');
        li.className = 'done d-flex justify-content-between rounded ';
        li.innerHTML = `
            ${task.input}
            <div>
                <img class="done-button" src="./img/Check.svg" onclick="doneTask(${index})">
                <img class="delete-button" src="./img/TrashSimple.svg" onclick="deleteTask(${index})">
            </div>
        `;
        taskList.appendChild(li);
    });

    taskCount.textContent = inputList.length;  // Update the task count
}

function deleteTask(index) {
    inputList.splice(index, 1);  // Remove the task from the list
    localStorage.setItem("taskList", JSON.stringify(inputList)); // Update localStorage
    displayData();  // Update the display
}

function doneTask(index) {
    doneList.push(inputList[index]);  // Add the task to the done list
    inputList.splice(index, 1);  // Remove the task from the input list
    localStorage.setItem("taskList", JSON.stringify(inputList)); // Update localStorage for taskList
    localStorage.setItem("doneList", JSON.stringify(doneList)); // Update localStorage for doneList
    displayData();  // Update the task list display
    displayDataDone();  // Update the done task list display
}

function displayDataDone() {
    let doneTaskList = document.getElementById("done-task-list");
    let doneTaskCount = document.getElementById("done-task-count");

    doneTaskList.innerHTML = '';  // Clear the current list before adding the new tasks

    doneList.forEach((task, index) => {
        let li = document.createElement('li');
        li.className = 'done d-flex justify-content-between rounded text-success fs-5 text-decoration-line-through';
        li.innerHTML = `
            ${task.input}
            <div>
                <img class="delete-button" src="./img/TrashSimple.svg" onclick="deleteDoneTask(${index})">
            </div>
        `;
        doneTaskList.appendChild(li);
    });

    // Update the done task count
    doneTaskCount.textContent = doneList.length;
}


function deleteDoneTask(index) {
    doneList.splice(index, 1);  // Remove the task from the done list
    localStorage.setItem("doneList", JSON.stringify(doneList)); // Update localStorage
    displayDataDone();  // Update the done task list display
}
