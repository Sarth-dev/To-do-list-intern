document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const todoDate = document.getElementById("todoDate");
    const addTodoButton = document.getElementById("addTodo");
    const todoList = document.getElementById("todoList");
    const filterAllButton = document.getElementById("filterAll");
    const filterPendingButton = document.getElementById("filterPending");
    const filterCompletedButton = document.getElementById("filterCompleted");

    let todos = []; 

    
    const addTodo = () => {
        const text = todoInput.value.trim();
        const date = todoDate.value;

        if (text === "" || date === "") {
            alert("Please enter a task and a date.");
            return;
        }

        const newTodo = {
            id: Date.now(),
            text,
            date,
            completed: false,
        };

        todos.push(newTodo);
        renderTodos();
        todoInput.value = "";
        todoDate.value = "";
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
                    ${todo.text} <small class="text-muted">(${todo.date})</small>
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

    
    window.toggleComplete = toggleComplete;
    window.deleteTodo = deleteTodo;
});
