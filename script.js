document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const todoDate = document.getElementById("todoDate");
    const todoCategory = document.getElementById("todoCategory");
    const addTodoButton = document.getElementById("addTodo");
    const todoList = document.getElementById("todoList");

    const filterAllButton = document.getElementById("filterAll");
    const filterPendingButton = document.getElementById("filterPending");
    const filterCompletedButton = document.getElementById("filterCompleted");
    const filterWorkButton = document.getElementById("filterWork");
    const filterPersonalButton = document.getElementById("filterPersonal");
    const filterCollegeButton = document.getElementById("filterCollege");

    let todos = [];


    const addTodo = () => {
        const text = todoInput.value.trim();
        const date = todoDate.value;
        const category = todoCategory.value;

        if (text === "" || date === "" || !category) {
            alert("Please enter all fields.");
            return;
        }

        const newTodo = {
            id: Date.now(),
            text,
            date,
            category,
            completed: false,
        };

        todos.push(newTodo);
        renderTodos();
        todoInput.value = "";
        todoDate.value = "";
        todoCategory.value = "";
    };


    const toggleComplete = (id) => {
        todos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        renderTodos();
    };


    const deleteTodo = (id) => {
        todos = todos.filter((todo) => todo.id !== id);
        renderTodos();
    };


    const filterTodos = (filter) => {
        let filteredTodos = [];
        if (filter === "Pending") {
            filteredTodos = todos.filter((todo) => !todo.completed);
        } else if (filter === "Completed") {
            filteredTodos = todos.filter((todo) => todo.completed);
        } else if (["Work", "Personal", "College"].includes(filter)) {
            filteredTodos = todos.filter((todo) => todo.category === filter);
        } else {
            filteredTodos = todos;
        }
        renderTodos(filteredTodos);
    };


    const renderTodos = (list = todos) => {
        todoList.innerHTML = "";
        list.forEach((todo) => {
            const li = document.createElement("li");
            li.className = `list-group-item d-flex justify-content-between align-items-center ${
                todo.completed ? "completed" : ""
            }`;
            li.innerHTML = `
                <span>
                    <input type="checkbox" class="me-2" ${
                        todo.completed ? "checked" : ""
                    } onchange="toggleComplete(${todo.id})">
                    ${todo.text} <small class="text-muted">(${todo.date}, ${todo.category})</small>
                </span>
                <button class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">Delete</button>
            `;
            todoList.appendChild(li);
        });
    };


    addTodoButton.addEventListener("click", addTodo);
    filterAllButton.addEventListener("click", () => filterTodos("All"));
    filterPendingButton.addEventListener("click", () => filterTodos("Pending"));
    filterCompletedButton.addEventListener("click", () => filterTodos("Completed"));
    filterWorkButton.addEventListener("click", () => filterTodos("Work"));
    filterPersonalButton.addEventListener("click", () => filterTodos("Personal"));
    filterCollegeButton.addEventListener("click", () => filterTodos("College"));


    window.toggleComplete = toggleComplete;
    window.deleteTodo = deleteTodo;
});
