const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;

    // Toggle task complete
    span.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Delete task
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Add task with Enter key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

renderTasks();
