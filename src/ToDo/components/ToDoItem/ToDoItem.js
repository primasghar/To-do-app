import React from "react";
import classes from "./ToDoItem.module.css";

import {Icon} from "react-icons-kit";
import {remove} from 'react-icons-kit/fa/remove'
import {longArrowLeft} from 'react-icons-kit/fa/longArrowLeft';
import {longArrowRight} from 'react-icons-kit/fa/longArrowRight'

const ToDoItem = ({text, handleTask, handleRemoval}) => {

    return (
        <li className={classes.item}>
            <p>{text}</p>
            <span className={classes.itemButtons}>
                <Icon icon={remove} className={classes.delBtn} onClick={handleRemoval} role="button"/>
                <span className={classes.shuffle} onClick={handleTask}  role="button">
                    <Icon icon={longArrowLeft} className={classes.arrowLeft } size={16}/>
                    <Icon icon={longArrowRight} className={classes.arrowRight} size={16}/>
                </span>

            </span>
        </li>
    );
};

export default ToDoItem;
