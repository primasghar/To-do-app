import React, {useRef} from "react";

import ToDoItem from "../ToDoItem";

import classes from "./ToDoList.module.css";

const ToDoList = ({id, tasks, handleTask, handleRemoval }) => {
const dragItem = useRef();
  const handleDragStart = (event, index, id)=>{
    console.log("drag starts...", index,  id);
    dragItem.current = {index, id}
  }

  // const handleDragOver = (event, index)=>{
  //   event.preventDefault();
  //   console.log(index);
  // }
  return (
    <ul className={classes.list} >
      {!tasks.length && "No tasks"}
      {tasks.map((task, index) => (
        <ToDoItem
            id={id}
          text={task.text}
          key={index}
          handleTask={() => handleTask(tasks, task)}
          handleRemoval={(event) => handleRemoval(event, tasks, task)}
          onDragStart={(event)=handleDragStart(event, task.text, id)}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
