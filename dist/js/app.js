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

const addTaskToLocalStorage = (task) => {
	const tasks = localStorage.getItem('tasks');
	if (tasks) {
		const tasksFromStorage = JSON.parse(tasks);
		tasksFromStorage.push(task);
		console.log(tasksFromStorage, task);
		localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
	} else {
		localStorage.setItem('tasks', JSON.stringify([task]));
	}
};

const readTasksFromLocalStorage = () => {
	const tasks = localStorage.getItem('tasks');
	return JSON.parse(tasks) || [];
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

const isTaskTextEmpty = (text) => {
	return text.length === 0;
};

const updateCurrentTasksCounter = () => {
	const currentTasks = Array.from(taskList.children).filter(
		(task) => !task.classList.contains('task--done')
	).length;
	currentTaskCounter.textContent = currentTasks;
};

const updateCompletedTasksCounter = () => {
	const currentTasks = Array.from(taskList.children).filter((task) =>
		task.classList.contains('task--done')
	).length;
	completedTaskCounter.textContent = currentTasks;
};

const updateCounters = () => {
	updateCompletedTasksCounter();
	updateCurrentTasksCounter();
};

const onFilterTasks = (e) => {
	const tasks = Array.from(taskList.children).forEach((task) => {
		if (
			task
				.querySelector('.task__text')
				.textContent.toLowerCase()
				.includes(e.target.value.toLowerCase())
		) {
			task.style.display = 'flex';
		} else {
			task.style.display = 'none';
		}
	});
};

const onAddTask = (e) => {
	e.preventDefault();
	const taskText = createTaskInput.value;

	if (isTaskTextEmpty(taskText)) {
		showFormError(createTaskError, "Task can't be empty");
	} else {
		if (isTaskUnique(taskText)) {
			const task = createTask(taskText);
			addTaskToLocalStorage(taskText);
			taskList.appendChild(task);
			addTaskEl.classList.remove('show');
			resetCreateTaskInput();
			updateFilterFormDisplay();
			updateCounters();
		} else {
			addUniqueClass(createTaskForm, 'form--invalid');
			showFormError(createTaskError, 'Task already exists!');
			resetCreateTaskInput();
		}
	}
};

const onTaskClick = (e) => {
	console.log(e.target);
	if (e.target.classList.contains('task__text')) {
		e.target.parentElement.classList.toggle('task--done');
	} else if (e.target.classList.contains('task__delete')) {
		e.target.parentElement.remove();
		updateFilterFormDisplay();
	}

	updateCounters();
};

setDateElement();
const addTaskBtn = document.getElementById('create-task');
const addTaskEl = document.querySelector('.add-task');
const createTaskForm = document.querySelector('.add-form');
const createTaskInput = document.querySelector('#task-name');
const taskList = document.querySelector('.tasks__list');
const filterForm = document.getElementById('filter-tasks-form');
const filterInput = document.getElementById('filter-tasks');
const createTaskError = document.getElementById('create-task-error');
const currentTaskCounter = document.getElementById('active-tasks-counter');
const completedTaskCounter = document.getElementById('completed-tasks-counter');

addTaskBtn.addEventListener('click', () => {
	addTaskEl.classList.add('show');
});

createTaskForm.addEventListener('submit', onAddTask);

filterForm.addEventListener('submit', (e) => {
	e.preventDefault();
});

window.addEventListener('DOMContentLoaded', () => {
	const tasks = readTasksFromLocalStorage();
	console.log(tasks);
	tasks.forEach((task) => taskList.appendChild(createTask(task)));
	updateFilterFormDisplay();
	updateCounters();
});

filterInput.addEventListener('input', onFilterTasks);

taskList.addEventListener('click', onTaskClick);
