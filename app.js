
// Selectors

const todoInput = document.querySelector(".todo-input"); // Box where the user enters the task.
const todoButton = document.querySelector(".todo-button"); // The button which user clicks to create the entered todo.
const todoList = document.querySelector(".todo-list"); // All of the todos combined within a list.
const filterOption = document.querySelector(".filter-todo"); // Drop-down menu to filter todos, all, completed, uncompleted.

// Create todo object
function TodoObject(task, isCompleted) {
  this.task = task;
  this.isCompleted = isCompleted;
}


// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); // get todos once the web page is loaded.
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck); // click to delete or check the todo.
filterOption.addEventListener("click", filterTodo);


let ifCompleted;
let todoTask;
let todoObjectArray = [];
// todoObjArray = [todoobj1, todoobj2]
// todoobj1 = {
//   task: task1,
//   isCompleted: true;
// }


// FUNCTIONS
// Adding



function addTodo(event) {
  // Prevent form from submitting:
  event.preventDefault();

  //Before adding anything, restore the tasks from the Local Storage first.


  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create Li
  const newTodo = document.createElement("li");

  // Keep the task inside a variable
  todoTask = todoInput.value; // this will be used as object property later on.
  // let unknownTodo = todoInput.value;
  const taskUndefined = new TodoObject(todoTask, false);



  todoObjectArray.push(taskUndefined);
  console.log("this shouldn't be empty: " + todoObjectArray);

  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Add todo to local Storage
  // saveLocalTodos(todoInput.value);
  saveLocalTodos(taskUndefined);
  console.log(taskUndefined);
  // HERE WAS COMMENTED OUT, ABOVE PART
  //
  // Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'> </i> "
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Check Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'> </i> "
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // APPEND TO LIST
  todoList.appendChild(todoDiv);
  // Clear Todo Input value
  todoInput.value = "";
}


// Delete or Check
function deleteCheck(e) {
  const item = e.target;
  // Delete
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    // removeLocalTodos(todo);
    console.log(todo);
    todo.addEventListener("transitionend", function() {

      todo.remove();
      // Delete todoObject from the todoObjectArray.
      // Update the current todoObjectArray from Local storage
      let previousTodos = JSON.parse(localStorage.getItem("todoObjectsArray")); // PreviousTodos is an array.
      console.log("todoObjectArray initial: " + todoObjectArray);
      todoObjectArray = previousTodos;
      console.log("todoObjectArray after: " + todoObjectArray);
      todoObjectArray.forEach(function(todoObject) {
        const index = todoObjectArray.indexOf(todoObject);
        if (todoObject.task === item.parentNode.firstChild.innerText) {
          todoObjectArray.splice(index, 1);
          // Update the Local Storage after deleting a Todo:
          localStorage.setItem("todoObjectsArray", JSON.stringify(todoObjectArray));
        }
      });
    });

    // todo.remove();
  }
  // Check Mark
  else if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    var n = todo.classList.contains("completed");

    // My adjustments:
    const todoIndex = item.parentNode.firstChild.innerText; // hello
    // Update Object Array:
    let previousTodos = JSON.parse(localStorage.getItem("todoObjectsArray")); // PreviousTodos is an array.
    todoObjectArray = previousTodos;
    // console.log(todoObjectArray); //(object1 , object2)
    todoObjectArray.forEach(function(arrayItem) {


      if (n === true && todoIndex === arrayItem.task) {
        arrayItem.isCompleted = true;

      } else if (n === false && todoIndex === arrayItem.task) {
        arrayItem.isCompleted = false;

      }

    });
    localStorage.setItem("todoObjectsArray", JSON.stringify(todoObjectArray));

  }


}


// ifCompleted will be passed later into TodoObject.


//Save Local todos
function saveLocalTodos(todo) {
  //   // Saving todos into local storage:
  let previousTodos = JSON.parse(localStorage.getItem("todoObjectsArray")); // PreviousTodos is an array.

  if (previousTodos === null) {
    previousTodos = [];
  }

  previousTodos.push(todo);
  localStorage.setItem("todoObjectsArray", JSON.stringify(previousTodos));
}

// Load todos back into the webpage from the Local Storage.:
function getTodos() {
  console.log("here");
  localData = JSON.parse(localStorage.getItem("todoObjectsArray"));
  console.log(localData);
  // Local data is the array of all the objects that are stored inside Local Storage.
  if (localData === null) {
    console.log("localData is null. It's empty for now.")
  } else {
    localData.forEach(function(todoObject) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      // Create Li
      const newTodo = document.createElement("li");
      newTodo.innerText = todoObject.task;
      // Add "completed" class into todos if todoObjectsArray.isCompleted = true:
      if (todoObject.isCompleted === true) { // HEREEEEEEEE OMG
        todoDiv.classList.add("completed");
      }
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      // Check Mark Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = "<i class='fas fa-check'> </i> "
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      // Check Trash Button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = "<i class='fas fa-trash'> </i> "
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      // APPEND TO LIST
      todoList.appendChild(todoDiv);


    });
  }

}


function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }

  });
}



// MY ADDITION TO THIS PROJECT

// Store the completed Todos to the storage.

// 1) Once you click on the check mark, create another list of array with the checked ones, completedTasks.
// 2) Store completedTasks inside Local Storage.
// 3) Display this set of array when "Completed" is selected from the filter.
// 4) When the web-page is refreshed, load the completedTasks back into todolist.
