export const listContainer = document.querySelector('.to-do-holder');
export const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
export const displaytasks = () => {
  listContainer.innerHTML = '';
  tasks.forEach((todo) => {
    tasks.sort((a, b) => a.index - b.index);
    listContainer.innerHTML += `
         <div class="todo" id=${todo.index}>
          <input type="checkbox" class="checkbox"${todo.completed ? 'checked' : ''}
          data-action="check">
          <p class="list-text" data-action="check">${todo.description}</p>
          <i class="fa-solid fa-ellipsis-vertical Edit" data-action="edit"></i>
          <i class="fa-solid fa-trash-can delete" data-action="delete"> </i>
          </div>
          `;
  });
};

displaytasks();

// document.addEventListener('DOMContentLoaded', displaytasks);