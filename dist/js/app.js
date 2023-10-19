const addUniqueClass = (el, className) => {
	el.classList.contains(className) ? '' : el.classList.add(className);
};

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

const isTaskUnique = (text) => {
	const a = Array.from(taskList.children).map(
		(task) => task.querySelector('.task__text').textContent
	);
	return !a.includes(text);
	// return !!Array.from(taskList.children).find(
	// 	(task) => task.querySelector('.task__text').textContent === text
	// );
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

const showFormError = (el, text) => {
	el.textContent = text;
};

const resetCreateTaskInput = () => {
	createTaskInput.value = '';
};

const updateFilterFormDisplay = () => {
	hasTasks() ? showFilterForm() : hideFilterForm();
};

const onAddTask = (e) => {
	e.preventDefault();
	const taskText = createTaskInput.value;
	console.log(taskText);
	console.log(isTaskUnique(taskText));
	if (isTaskUnique(taskText)) {
		const task = createTask(taskText);
		taskList.appendChild(task);
		addTaskEl.classList.remove('show');
		resetCreateTaskInput();
		updateFilterFormDisplay();
	} else {
		addUniqueClass(createTaskForm, 'form--invalid');
		showFormError(createTaskError, 'Task already exists!');
		resetCreateTaskInput();
	}
};

const onTaskClick = (e) => {
	if (e.target.classList.contains('task__text')) {
		e.target.parentElement.classList.toggle('task--done');
	}
};

setDateElement();
const addTaskBtn = document.getElementById('create-task');
const addTaskEl = document.querySelector('.add-task');
const createTaskForm = document.querySelector('.add-form');
const createTaskInput = document.querySelector('#task-name');
const taskList = document.querySelector('.tasks__list');
const filterForm = document.getElementById('filter-tasks-form');
const createTaskError = document.getElementById('create-task-error');

addTaskBtn.addEventListener('click', () => {
	addTaskEl.classList.add('show');
});

createTaskForm.addEventListener('submit', onAddTask);

window.addEventListener('DOMContentLoaded', () => {
	updateFilterFormDisplay();
});

taskList.addEventListener('click', onTaskClick);
