const API_URL = "/todos";

async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo.task}
      <span>
        <span class="edit" onclick="editTodo('${todo._id}', '${todo.task}')">✏️</span>
        <span class="delete" onclick="deleteTodo('${todo._id}')">❌</span>
      </span>
    `;
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("taskInput");
  if (input.value === "") return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: input.value })
  });

  input.value = "";
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTodos();
}

async function editTodo(id, oldTask) {
  const newTask = prompt("Edit task:", oldTask);
  if (!newTask) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: newTask })
  });

  fetchTodos();
}

fetchTodos();
