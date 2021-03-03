//Select element
const form = document.querySelector('#todo-form');
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clearAllTodos");

eventListener();

function eventListener(){
    form.addEventListener("submit",addTodo);
    
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);

    secondCardBody.addEventListener("click",deleteToDo);

    filter.addEventListener("keyup",filterTodos);

    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    while(todoList.firstElementChild != null){
        //todoList.removeChild(todoList.firstElementChild);
        todoList.firstElementChild.remove();
    }
    localStorage.removeItem("todos");
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }else{
            listItem.setAttribute("style","display : block");
        }
    });
}


function deleteToDo(e){
    //console.log(e.target);

    if(e.target.className === "fa fa-remove"){

        e.target.parentElement.parentElement.remove();
        deleteToDoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("warning","Successfully deleted");
    }

    
}

function deleteToDoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); //delete array
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addToDoUI(todo);
    })
}

function addTodo(e){
    const newToDo = todoInput.value.trim();

    if(newToDo === ""){
        showAlert("danger","Please Enter some To Do");
    }else{
        addToDoUI(newToDo);
        addToDoStorage(newToDo);
        showAlert("success","Successfuly added");
    }
    

    e.preventDefault();
}

function showAlert(type,message){
    /*
    <div class="alert alert-danger" role="alert">
        This is a danger alert—check it out!
    </div>
    */
    
    //create alert message
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //Timeoout
    setTimeout(function(){
        alert.remove();
    },2000);
    
}

function addToDoUI(newToDo){
    /*
    <!-- <li class="list-group-item d-flex justify-content-between">
        Todo 1
        <a href = "#" class ="delete-item">
            <i class = "fa fa-remove"></i>
        </a>

    </li>-->
    */

    //create list <li></li>
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newToDo));
    
    // create link <a></a>
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.appendChild(link);
    todoList.appendChild(listItem);

    todoInput.value ="";
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addToDoStorage(newToDo){
    let todos = getTodosFromStorage();

    todos.push(newToDo);

    localStorage.setItem("todos",JSON.stringify(todos));
}