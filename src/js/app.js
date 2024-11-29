import { elTodoForm, elTodoTemplate, elTodosParent } from "./html-selection.js";

elTodoForm.onsubmit = function (e) {
  e.preventDefault();

  const todos = JSON.parse(localStorage.getItem("nimadir")) || [];

  const data = new FormData(e.target);
  const todoName = data.get("todoName");
  const todoBody = data.get("todoBody");

  const newTodo = { title: todoName, body: todoBody, completed: false };
  todos.push(newTodo);

  localStorage.setItem("nimadir", JSON.stringify(todos));

  const element = elTodoTemplate.content.cloneNode(true);
  const todoElement = element.querySelector(".todo-item");

  todoElement.querySelector("#todoTitle").textContent = todoName;
  const todoBodyEL = todoElement.querySelector("#todoBody");
  todoBodyEL.textContent = todoBody;

  const todoCheckbox = todoElement.querySelector("#todoCheckbox");
  todoCheckbox.onchange = (e) => {
    if (e.target.checked) {
      todoBodyEL.classList.add("line-through", "opacity-70");
      newTodo.completed = true;
    } else {
      todoBodyEL.classList.remove("line-through", "opacity-70");
      newTodo.completed = false;
    }

    const updatedTodos = JSON.parse(localStorage.getItem("nimadir")) || [];
    const index = updatedTodos.findIndex(
      (todo) => todo.title === todoName && todo.body === todoBody
    );
    updatedTodos[index] = newTodo;
    localStorage.setItem("nimadir", JSON.stringify(updatedTodos));
  };

  const deleteTodoButton = todoElement.querySelector("#deleteTodo");
  deleteTodoButton.onclick = (e) => {
    const todoItemToRemove = e.target.closest(".todo-item");
    todoItemToRemove.remove();

    const updatedTodos = JSON.parse(localStorage.getItem("nimadir")) || [];
    const index = updatedTodos.findIndex(
      (todo) => todo.title === todoName && todo.body === todoBody
    );

    updatedTodos.splice(index, 1);
    localStorage.setItem("nimadir", JSON.stringify(updatedTodos));
  };

  elTodosParent.appendChild(todoElement);
  e.target.reset();
};

document.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("nimadir")) || [];

  todos.forEach((todo) => {
    const element = elTodoTemplate.content.cloneNode(true);
    const todoElement = element.querySelector(".todo-item");

    todoElement.querySelector("#todoTitle").textContent = todo.title;
    const todoBodyEL = todoElement.querySelector("#todoBody");
    todoBodyEL.textContent = todo.body;

    const todoCheckbox = todoElement.querySelector("#todoCheckbox");

    if (todo.completed) {
      todoCheckbox.checked = true;
      todoBodyEL.classList.add("line-through", "opacity-70");
    }

    todoCheckbox.onchange = (e) => {
      if (e.target.checked) {
        todoBodyEL.classList.add("line-through", "opacity-70");
        todo.completed = true;
      } else {
        todoBodyEL.classList.remove("line-through", "opacity-70");
        todo.completed = false;
      }

      const updatedTodos = JSON.parse(localStorage.getItem("nimadir")) || [];
      const index = updatedTodos.findIndex(
        (t) => t.title === todo.title && t.body === todo.body
      );
      updatedTodos[index] = todo;
      localStorage.setItem("nimadir", JSON.stringify(updatedTodos));
    };

    const deleteTodoButton = todoElement.querySelector("#deleteTodo");
    deleteTodoButton.onclick = (e) => {
      const todoItemToRemove = e.target.closest(".todo-item");
      todoItemToRemove.remove();

      const updatedTodos = JSON.parse(localStorage.getItem("nimadir")) || [];
      const index = updatedTodos.findIndex(
        (t) => t.title === todo.title && t.body === todo.body
      );
      updatedTodos.splice(index, 1);
      localStorage.setItem("nimadir", JSON.stringify(updatedTodos));
    };

    elTodosParent.appendChild(todoElement);
  });
});
