export const findTaskIndex = (tasksList, taskIndexToFind) =>
  tasksList.findIndex((task) => task === taskIndexToFind);

export const filteredTasks = (tasksList, taskToFilterIndex) =>
  tasksList.filter((task, index) => index !== taskToFilterIndex);

export const saveToLocalHost = (key, arr) =>
  localStorage.setItem(key, JSON.stringify(arr));

export const retrieveFromLocalHost = (key) =>
  JSON.parse(localStorage.getItem(key));
