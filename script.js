document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const todoDate = document.getElementById("todoDate");
    const todoCategory = document.getElementById("todoCategory");
    const todoPriority = document.getElementById("todoPriority");
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
        const priority = todoPriority.value;

        if (text === "" || date === "" || !category || !priority) {
            alert("Please enter all fields.");
            return;
        }

        const newTodo = {
            id: Date.now(),
            text,
            date,
            category,
            priority,
            completed: false,
        };

        todos.push(newTodo);
        sortTodos();
        renderTodos();
   
        todoInput.value = "";
        todoDate.value = "";
        todoCategory.value = "";
        todoPriority.value = "";
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

    
    const sortTodos = () => {
        todos.sort((a, b) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
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
            } ${todo.priority === "High" ? "priority-high" : todo.priority === "Medium" ? "priority-medium" : "priority-low"}`;
            li.innerHTML = `
                <span>
                    <input type="checkbox" class="me-2" ${
                        todo.completed ? "checked" : ""
                    } onchange="toggleComplete(${todo.id})">
                    ${todo.text} <small class="text-muted">(${todo.date}, ${todo.category}, ${todo.priority} Priority)</small>
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
