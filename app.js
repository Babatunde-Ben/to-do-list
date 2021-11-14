const list = document.querySelector(".list");
const check = document.querySelectorAll(".check");
const bin = document.querySelectorAll(".bin");
const text = document.getElementById("text");
const error = document.getElementById("error");
const create = document.getElementById("create");
const clearAll = document.getElementById("clearAll");
const newTaskValue = JSON.parse(localStorage.getItem("new"));

// function to indicate that value is in the input box

text.addEventListener("keyup", function () {
  if (text.value.trim() != 0) {
    create.classList.add("active");
  } else {
    create.classList.remove("active");
  }
});

// function to display a message when list is empty or otherwise show task

function emptyList() {
  if (
    localStorage.getItem("new") == null ||
    JSON.parse(localStorage.getItem("new")) == ""
  ) {
    list.innerHTML = `<div class="empty">
    <p>Your list is empty!</p>
    <p>Enter a task below</p>
  </div>`;
  }
}
showTask(); // invoking show task function
emptyList();

// function to add new task

create.addEventListener("click", function addNewTask(e) {
  if (text.value.length === 0) {
    // input validation

    error.textContent = `Cannot create empty task`;
    error.classList.add("fail");
  } else if (text.value.length >= 100) {
    error.textContent = `text input too long`;
    error.classList.add("fail");
  } else {
    // ---------setting tasks in local storage-------

    let userData = text.value;
    if (localStorage.getItem("new") == null) {
      taskArray = [];
    } else {
      taskArray = JSON.parse(localStorage.getItem("new"));
    }
    taskArray.push(userData);

    localStorage.setItem("new", JSON.stringify(taskArray));

    // ---------

    text.value = "";

    showTask(); // invoking show task function

    // input validation
    error.classList.remove("fail");
  }
});

function showTask() {
  if (localStorage.getItem("new") == null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(localStorage.getItem("new"));
  }
  let newTaskDiv = ` `;

  // newTaskDiv.classList.add("task");

  taskArray.forEach((element, index) => {
    newTaskDiv += `<div class="task">
    <p>${element}</p>
    <div class="cta">
      <i class="fas fa-trash-alt bin"></i>
    </div>
  </div>`;
    // console.log(newTaskDiv);
  });

  list.innerHTML = newTaskDiv;
}

// code to check if task is done

document.addEventListener("click", function (e) {
  if (e.target.matches(".check")) {
    const confirmCheck = e.target.parentElement.previousElementSibling;
    if (confirmCheck.classList.contains("task-deco")) {
      confirmCheck.classList.remove("task-deco");
      e.target.style.color = "rgb(51, 51, 51)";
    } else {
      confirmCheck.classList.add("task-deco");
      e.target.style.color = "white";
    }
  }
});

// function to delete task and update local st
function deleteTask(e, index) {
  if (e.target.matches(".bin")) {
    const confirmDelete = e.target.parentElement.parentElement;
    list.removeChild(confirmDelete);
    taskArray = JSON.parse(localStorage.getItem("new"));
    taskArray.splice(index, 1);
    localStorage.setItem("new", JSON.stringify(taskArray));
    showTask();
    emptyList();
  }
}

document.addEventListener("click", deleteTask);

// function to clear all list

clearAll.addEventListener("click", function clearAll() {
  localStorage.clear();
  emptyList();
});
