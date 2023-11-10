import React from "react";
import classes from "./ToDoItem.module.css";

import {Icon} from "react-icons-kit";
import {remove} from 'react-icons-kit/fa/remove'

const ToDoItem = ({ text, handleTask, handleRemoval}) => {
  return (
    <li className={classes.item} onClick={handleTask} role="button">
      <p>{text}</p>
        <Icon icon={remove}   className={classes.del} onClick={handleRemoval}/>
    </li>
  );
};

export default ToDoItem;
