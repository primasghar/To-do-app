import React, { useState } from "react";
import classes from "./AddForm.module.css";
import Button from "../../../Shared/Button";


import {toast} from 'react-toastify';

const AddForm = (props) => {
  const [enteredTask, setEnteredTask] = useState("");

  const onInputChange = (event) => {
    setEnteredTask(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredTask.length === 0){
     return  toast.error("Please write in the input!", {
       theme: "dark",
     });
    }
    else {
      const taskData = {
      text: enteredTask,
    };
      props.onSaveTask(taskData);
      setEnteredTask("");}


  };

  return (
    <form className={classes.container} onSubmit={submitHandler}>
      <input
        type="text"
        id="task"
        className={classes.inputField}
        onChange={onInputChange}
        value={enteredTask}
        placeholder={"Enter the task"}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddForm;
