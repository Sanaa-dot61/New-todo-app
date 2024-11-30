// Components from HTML To JS
const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

// Local Storage
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];

showTodos();
// create li
function getTodoHtml(todo, index) {
    if (filter && filter != todo.status) {
        return '';
    }
    let checked = todo.status == "completed" ? "checked" : "";          // Is Completed ?
    return`                                                             
    <li class="todo">
        <label for="${index}">
            <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
            <span class="${checked}">${todo.name}</span>
        </label>
    </li>
    `;                                                                  // The HTML
}
// Show instead of photo
function showTodos() {
    if (todosJson.length == 0) {
        todosHtml.innerHTML = '';
        emptyImage.style.display = 'block';
    }
    else {
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
        emptyImage.style.display = 'none';
    }
}
// Add
function addTodo(todo)  {
    input.value = "";
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}
input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if (!todo || e.key != "Enter") {
        return;
    }
    addTodo(todo);
});
addButton.addEventListener("click", () => {
    let todo = input.value.trim();
    if (!todo) {
        return;
    }
    addTodo(todo);
});
// Update UL
function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
        todoName.classList.add("checked");
        todosJson[todo.id].status = "completed";
    }
    else {
        todoName.classList.remove("checked");
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
}
// delete
function remove(todo) {
    const index = todo.dataset.index;
    todosJson.splice(index, 1);
    showTodos();
    localStorage.setItem("todos", JSON.stringify(todosJson));
}
filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
            filter = '';
        }
        else {
            filters.forEach(tag => tag.classList.remove('active'));
            el.classList.add('active');
        filter = e.target.dataset.filter;
        }
        showTodos();
    });
});
// Local 
deleteAllButton.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
});