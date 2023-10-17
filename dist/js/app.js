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

setDateElement();
