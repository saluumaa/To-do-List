import {listContainer, displaytasks} from './display.js'

let form = document.querySelector('.form')
let todoInput = document.querySelector('#todo-input')
export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editTodoId = -1;
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  saveTodo()
  displaytasks();
  localStorage.setItem('tasks', JSON.stringify(tasks))
  
})

function saveTodo(todoIndex = null, todoValue = todoInput.value) {
    if (todoIndex !== null) {
      tasks[todoIndex].description = todoValue;
    } else {
      const index = tasks.length + 1;
      tasks.push({
        description: todoValue,
        completed: false,
        index: index,
      });
    }
  
    todoInput.value = '';
  }

// eventlistener for all TODOS
listContainer.addEventListener('click',(e)=>{
    const target = e.target;
    const parentElement = target.parentNode
    if(parentElement.className !== 'todo'){
      return
    }
    // todo id
    const todo = parentElement;
    const todoId = Number(todo.id)
    //target action
    const action = target.dataset.action
    action === 'check' && checkTodo(todoId);
    action === 'edit' && editTodo(todoId);
    action === 'delete' && deleteTodo(todoId)
  })

  function editTodo(todoId) { 
    const container = document.getElementById(todoId);
    const taskDescription = container.querySelector('.list-text');
    const editIcon = container.querySelector('.Edit');
    const deleteIcon = container.querySelector('.delete');
    taskDescription.contentEditable = true;
    taskDescription.focus();
    editTodoId = todoId;
    editIcon.classList.add('hide');
    deleteIcon.classList.add('show');
    taskDescription.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        saveTodo(todoId, taskDescription.textContent);
        displaytasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskDescription.contentEditable = false;
        editIcon.classList.remove('hide');
        deleteIcon.classList.remove('show');
        editTodoId = -1;
      }
    });
  }

function deleteTodo(todoId) {
    tasks = tasks.filter((todo, index)=> index !== todoId);
    for (let i = 0; i <tasks.length; i++) {
      tasks[i].index = i + 1
      
    }
    editTodoId = -1;
    displaytasks();
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  displaytasks()