import { listContainer, displaytasks, tasks } from './display.js';

const form = document.querySelector('.form');
const todoInput = document.querySelector('#todo-input');

/* eslint-disable no-use-before-define */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  saveTodo();
  displaytasks();
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

// Save todo function
const saveTodo = (todoIndex = null, todoValue = todoInput.value) => {
  if (todoIndex !== null) {
    tasks[todoIndex].description = todoValue;
  } else {
    const index = tasks.length + 1;
    tasks.push({
      description: todoValue,
      completed: false,
      index,
    });
  }

  todoInput.value = '';
};

// eventlistener for all Tasks
listContainer.addEventListener('click', (e) => {
  const { target } = e;
  const parentElement = target.parentNode;
  if (parentElement.className !== 'todo') {
    return;
  }
  // todo id
  const todo = parentElement;
  const todoId = Number(todo.id);
  // target action
  const actions = target.dataset.action;
  if (actions === 'edit') {
    editTodo(todoId);
  } else if (actions === 'delete') {
    deleteTodo(todoId);
  }
});

const editTodo = (todoId) => {
  const container = document.getElementById(todoId);
  const taskDescription = container.querySelector('.list-text');
  const editIcon = container.querySelector('.Edit');
  const deleteIcon = container.querySelector('.delete');
  taskDescription.contentEditable = true;
  taskDescription.focus();
  editIcon.classList.add('hide');
  deleteIcon.classList.add('show');
  taskDescription.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTodo(todoId - 1, taskDescription.textContent);
      displaytasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskDescription.contentEditable = false;
      editIcon.classList.remove('hide');
      deleteIcon.classList.remove('show');
    }
  });
};

function deleteTodo(todoId) {
  tasks.splice(todoId - 1, 1); // remove one element at index todoId - 1
  const todoElement = document.getElementById(todoId);
  todoElement.parentNode.removeChild(todoElement);
  for (let i = todoId - 1; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  displaytasks();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
