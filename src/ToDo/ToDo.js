import React, { useState, useEffect } from "react";

import AddForm from "./components/AddForm";
import ToDoList from "./components/ToDoList";

import classes from "./ToDo.module.css";

import { Icon } from "react-icons-kit";
import { clipboard } from "react-icons-kit/icomoon/clipboard";

import {
  findTaskIndex,
  filteredTasks,
  saveToLocalHost,
  retrieveFromLocalHost,
} from "./utilityFunctions";

function ToDo() {
  const [openTasks, setOpenTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    const loadedOpenTasks = retrieveFromLocalHost("openTasks");
    const loadedDoneTasks = retrieveFromLocalHost("doneTasks");

    if (loadedOpenTasks) {
      setOpenTasks(loadedOpenTasks);
    }

    if (loadedDoneTasks) {
      setDoneTasks(loadedDoneTasks);
    }
  }, []);

  const addTaskToOpen = (openTask) => {
    setOpenTasks((prevTasks) => {
      const newOpenArr = [openTask, ...prevTasks];

      saveToLocalHost("openTasks", newOpenArr);

      return newOpenArr;
    });
  };

  const addTaskToDone = (doneTask) => {
    setDoneTasks((prevTasks) => {
      const newDoneArr = [doneTask, ...prevTasks];
      saveToLocalHost("openTasks", newDoneArr);

      return newDoneArr;
    });
  };

  const handleOpenTask = (openTasks, doneTask) => {
    const filteredOpenTasks = filteredTasks(
      openTasks,
      findTaskIndex(openTasks, doneTask),
    );

    setOpenTasks(filteredOpenTasks);

    saveToLocalHost("openTasks", filteredOpenTasks);

    addTaskToDone(doneTask);
  };

  const handleDoneTask = (doneTasks, taskToOpen) => {
    const filteredDoneTasks = filteredTasks(
      doneTasks,
      findTaskIndex(doneTasks, taskToOpen),
    );

    setDoneTasks(filteredDoneTasks);

    saveToLocalHost("doneTasks", filteredDoneTasks);

    addTaskToOpen(taskToOpen);
  };

  const handleOpenRemoveTask = (event, tasks, toRemove) => {
    const remainderTasks = filteredTasks(tasks, findTaskIndex(tasks, toRemove));

    setOpenTasks(remainderTasks);

    saveToLocalHost("openTasks", remainderTasks);
    event.stopPropagation();
  };

  const handleDoneRemoveTask = (event, tasks, toRemove) => {
    const remainderTasks = filteredTasks(tasks, findTaskIndex(tasks, toRemove));

    setDoneTasks(remainderTasks);

    saveToLocalHost("doneTasks", remainderTasks);
    event.stopPropagation();
  };

  const saveTaskHandler = (enteredTaskData) => addTaskToOpen(enteredTaskData);

  return (
    <main className={classes.wrapper}>
      <div className={classes.Head}>
        <Icon icon={clipboard} size={50} style={{ color: "#ffffff" }} />
        <h1 className={classes.heading}>To do</h1>
      </div>
      <div className={classes.enterData}>
        <AddForm onSaveTask={saveTaskHandler} />
      </div>
      <section className={classes.openList}>
        <h2 className={classes.headline1}>Open Tasks </h2>
        <ToDoList
          tasks={openTasks}
          handleTask={handleOpenTask}
          handleRemoval={handleOpenRemoveTask}
        />
      </section>
      <section className={classes.doneList}>
        <h2 className={classes.headline2}>Done Tasks</h2>
        <ToDoList
          tasks={doneTasks}
          handleTask={handleDoneTask}
          handleRemoval={handleDoneRemoveTask}
        />
      </section>
    </main>
  );
}

export default ToDo;
