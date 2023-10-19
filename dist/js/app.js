const getCurrentDate = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.toLocaleString('default', { month: 'long' });
	const day = date.getDate();
	return { year, month, day };
};

const setDateElement = () => {
	const date = getCurrentDate();
	const yearEl = document.querySelector('.date__year');
	const monthEl = document.querySelector('.date__month');
	const dayEl = document.querySelector('.date__day');

	yearEl.textContent = date.year;
	monthEl.textContent = date.month;
	dayEl.textContent = date.day;
};

const createTask = (taskText) => {
	const li = document.createElement('li');
	li.className = 'task';

	const span = document.createElement('span');
	span.className = 'task__text';
	span.textContent = taskText;

	const deleteBtn = document.createElement('button');
	deleteBtn.className = 'task__delete';

	const deleteIcon = document.createElement('i');
	deleteIcon.className = 'fa-solid fa-x';
	deleteBtn.appendChild(deleteIcon);

	li.appendChild(span);
	li.appendChild(deleteBtn);
	return li;
};

const hasTasks = () => {
	return taskList.children.length > 0;
};

const hideFilterForm = () => {
	filterForm.style.display = 'none';
};

const showFilterForm = () => {
	filterForm.style.display = 'block';
};

const updateFilterFormDisplay = () => {
	hasTasks() ? showFilterForm() : hideFilterForm();
};

setDateElement();

const addTaskBtn = document.getElementById('create-task');
const addTaskEl = document.querySelector('.add-task');
const createTaskForm = document.querySelector('.add-form');
const createTaskInput = document.querySelector('#task-name');
const taskList = document.querySelector('.tasks__list');
const filterForm = document.getElementById('filter-tasks-form');

addTaskBtn.addEventListener('click', () => {
	addTaskEl.classList.add('show');
});

createTaskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const task = createTask(createTaskInput.value);
	console.log(task);
	taskList.appendChild(task);
	addTaskEl.classList.remove('show');
});

window.addEventListener('DOMContentLoaded', () => {
	updateFilterFormDisplay();
});
