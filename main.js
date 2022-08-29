const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;

!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem('tasks')));

let todoItemElements = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTamplate = (task, index) => {
  return `<div class="todo-item ${task.completed ? 'checked' : ''}">
      <div class="descreption">${task.description}</div>
      <div class="buttons">
        <input onclick="completeTask(${index})" type="checkbox" class="btn-complete" ${
    task.completed ? 'checked' : ''
  }>
        <button onclick="deleteTask(${index})" class="btn-deleten">Видалити</button>
      </div>
    </div>`;
};

const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed === false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed === true);
  tasks = [...activeTasks, ...completedTasks];
};

const fillHtmlList = () => {
  //   console.log('befor', todosWrapper);
  todosWrapper.innerHTML = '';
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTamplate(item, index);
    });
    todoItemElements = document.querySelectorAll('.todo-item');
  }
  //   console.log('after', todosWrapper);
};

fillHtmlList();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    // console.log(todoItemElements[index]);
    todoItemElements[index].classList.add('checked');
  } else {
    todoItemElements[index].classList.remove('checked');
  }
  updateLocal();
  fillHtmlList();
};

const addTasckHandler = () => {
  if (deskTaskInput.value) {
    tasks.unshift(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    //   console.log(tasks);
    deskTaskInput.value = '';
  } else {
    alert('Введіть нотатку!');
  }
};

addTaskBtn.addEventListener('click', () => {
  addTasckHandler();
});

deskTaskInput.addEventListener('keypress', (event) => {
  //   console.log(event);
  if (event.key === 'Enter') {
    addTasckHandler();
  }
});

const deleteTask = (index) => {
  setTimeout(() => {
    // console.log(index);
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
  }, 500);
};
