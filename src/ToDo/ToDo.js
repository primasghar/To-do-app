import React, {useState, useEffect} from "react";

import AddForm from "./components/AddForm";
import ToDoList from "./components/ToDoList";

import classes from "./ToDo.module.css";

import {Icon} from "react-icons-kit";
import {clipboard} from "react-icons-kit/icomoon/clipboard";


import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Scrollbars} from 'react-custom-scrollbars';

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

    const renderThumb = ({style, ...props}) => {
        const thumbStyle = {
            backgroundColor: '#000000',
        };
        return <div style={{...style, ...thumbStyle}} {...props} />;
    };

    //Adding task to Open list and saving the new array.
    const addTaskToOpen = (openTask) => {
        setOpenTasks((prevTasks) => {
            const newOpenArr = [openTask, ...prevTasks];
            saveToLocalHost("openTasks", newOpenArr);
            return newOpenArr;
        });
    };

    //Adding task to Done list and saving the new array.
    const addTaskToDone = (doneTask) => {
        setDoneTasks((prevTasks) => {
            const newDoneArr = [doneTask, ...prevTasks];
            saveToLocalHost("doneTasks", newDoneArr);
            return newDoneArr;
        });
    };
    //Task removal from open task list and adding it to done task list.
    const handleOpenTask = (openTasks, taskToDone) => {
        const filteredOpenTasks = filteredTasks(
            openTasks,
            findTaskIndex(openTasks, taskToDone),
        );
        setOpenTasks(filteredOpenTasks);
        saveToLocalHost("openTasks", filteredOpenTasks);
        addTaskToDone(taskToDone);
    };

    //Task removal from done task list and adding it to open task list.
    const handleDoneTask = (doneTasks, taskToOpen) => {
        const filteredDoneTasks = filteredTasks(
            doneTasks,
            findTaskIndex(doneTasks, taskToOpen),
        );
        setDoneTasks(filteredDoneTasks);
        saveToLocalHost("doneTasks", filteredDoneTasks);
        addTaskToOpen(taskToOpen);
    };
//Removing task from open list
    const handleOpenRemoveTask = (event, tasks, toRemove) => {
        const remainderTasks = filteredTasks(tasks, findTaskIndex(tasks, toRemove));

        setOpenTasks(remainderTasks);

        saveToLocalHost("openTasks", remainderTasks);
        event.stopPropagation();
    };
//Removing task from done list
    const handleDoneRemoveTask = (event, tasks, toRemove) => {
        const remainderTasks = filteredTasks(tasks, findTaskIndex(tasks, toRemove));
        setDoneTasks(remainderTasks);
        saveToLocalHost("doneTasks", remainderTasks);
        event.stopPropagation();
    };
//Fn for adding task from form to open list
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
                    <Icon icon={clipboard} size={50} style={{color: "#ffffff"}}/>
                    <h1 className={classes.heading}>To do</h1>
                </div>

                <div className={classes.enterData}>
                    <AddForm onSaveTask={saveTaskHandler}/>
                </div>

                <section className={classes.openList}>
                    <div className={classes.list_1Heading}>
                        <h2 className={classes.headline1}>Open Tasks -</h2><span
                        className={classes.openBadge}>{openTasks.length}</span>
                    </div>

                    <Scrollbars style={{height: '100%'}} renderThumbVertical={renderThumb} autoHide>
                        <ToDoList
                            id={"open"}
                            tasks={openTasks}
                            handleTask={handleOpenTask}
                            handleRemoval={handleOpenRemoveTask}
                        /></Scrollbars>
                </section>

                <section className={classes.doneList}>
                    <div className={classes.list_2Heading}>
                        <h2 className={classes.headline2}>Done Tasks -</h2><span
                        className={classes.doneBadge}>{doneTasks.length}</span>
                    </div>

                    <Scrollbars style={{height: '100%'}} renderThumbVertical={renderThumb} autoHide>
                        <ToDoList
                            id={"done"}
                            tasks={doneTasks}
                            handleTask={handleDoneTask}
                            handleRemoval={handleDoneRemoveTask}/>
                    </Scrollbars>
                </section>

            </main>
            <ToastContainer/>
        </div>
    );
}

export default ToDo;
