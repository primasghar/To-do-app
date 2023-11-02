import React from "react";
import img1 from "../../../Shared/Images/delete-24.png";

import classes from "./ToDoItem.module.css";

const ToDoItem = ({ text, handleTask, handleRemoval }) => {
  return (
    <li className={classes.item} onClick={handleTask} role="button">
      <p>{text}</p>
      <span>
        <img
          className={classes.del}
          src={img1}
          alt="trash icon for delete"
          onClick={handleRemoval}
        />
      </span>
    </li>
  );
};

export default ToDoItem;
