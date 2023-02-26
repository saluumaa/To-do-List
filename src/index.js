import './style.css';

const listContainer = document.querySelector('.to-do-holder');

const tasks = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 3,
  },
  {
    description: 'Read Quran',
    completed: false,
    index: 4,
  },
  {
    description: 'Do the laundary',
    completed: false,
    index: 3,
  },
  {
    description: 'build to-do-list project',
    completed: false,
    index: 2,
  },
  {
    description: 'clean the house',
    completed: false,
    index: 5,
  },
];

const displaytasks = () => {
  listContainer.innerHTML = '';
  for (let i = 0; i < tasks.length; i += 1) {
    tasks.sort((a, b) => a.index - b.index);
    listContainer.innerHTML += `
         <div class="todo" id=${tasks[i].index}>
          <input type="checkbox" class="checkbox"${tasks[i].completed ? 'checked' : ''}
          data-action="check">
          <p class="list-text" data-action="check">${tasks[i].description}</p>
          <i class="fa-solid fa-ellipsis-vertical Edit" data-action="edit"></i>
          <i class="fa-solid fa-trash-can delete" data-action="delete"> </i>
          </div>
          `;
  }
};
document.addEventListener('DOMContentLoaded', displaytasks);
