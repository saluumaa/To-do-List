
import {tasks} from './CRUD.js'
export const listContainer = document.querySelector('.to-do-holder');

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function displaytasks() {
  listContainer.innerHTML = '';
  tasks.forEach((todo, index) =>{
    tasks.sort((a, b) => a.index - b.index);
      listContainer.innerHTML += `
         <div class="todo" id=${index}>
          <input type="checkbox" class="checkbox"${todo.completed ? 'checked' : ''}
          data-action="check">
          <p class="list-text" data-action="check">${todo.description}</p>
          <i class="fa-solid fa-ellipsis-vertical Edit" data-action="edit"></i>
          <i class="fa-solid fa-trash-can delete" data-action="delete"> </i>
          </div>
          `;
  }); 
}
document.addEventListener('DOMContentLoaded', displaytasks);