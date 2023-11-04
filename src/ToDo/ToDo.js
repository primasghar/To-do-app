import React, { useState, useEffect } from "react";

import AddForm from "./components/AddForm";
import ToDoList from "./components/ToDoList";

import classes from "./ToDo.module.css";

import { Icon } from "react-icons-kit";
import { clipboard } from "react-icons-kit/icomoon/clipboard";

import { Scrollbar } from 'react-scrollbars-custom';

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
    <div className={classes.container}>
      <div className={classes.shape}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

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
          <Scrollbar style={{ width: "100%", height: "100%"}}>
          <ToDoList
            tasks={openTasks}
            handleTask={handleOpenTask}
            handleRemoval={handleOpenRemoveTask}
          /></Scrollbar>
        </section>
        <section className={classes.doneList}>
          <h2 className={classes.headline2}>Done Tasks</h2>
          <Scrollbar style={{ width: "100%", height: "100%"}}>
          <ToDoList
            tasks={doneTasks}
            handleTask={handleDoneTask}
            handleRemoval={handleDoneRemoveTask}
          /></Scrollbar>
        </section>
      </main>
    </div>
  );
}

export default ToDo;
