import React from "react";
import ToDoItem from "../ToDoItem";
import classes from "./ToDoList.module.css";

const ToDoList = ({ tasks, handleTask, handleRemoval }) => {
  return (
    <ul className={classes.list}>
      {!tasks.length && "No tasks"}
      {tasks.map((task, index) => (
        <ToDoItem
          text={task.text}
          key={index}
          handleTask={() => handleTask(tasks, task)}
          handleRemoval={(event) => handleRemoval(event, tasks, task)}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
