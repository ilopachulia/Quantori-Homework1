import React, { useRef } from "react";
import classes from "./modal.module.css";
import Button from "../Button/button";
import Input from "../Input/input";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";

const Modal = ({ onClose, onAddTask }) => {
  const taskNameRef = useRef();
  const healthRef = useRef();
  const workRef = useRef();
  const homeRef = useRef();
  const otherRef = useRef();
  const dateRef = useRef();

  const taskAddHandler = () => {
    const taskName = taskNameRef.current.value;
    const health = healthRef.current.checked ? "health" : "";
    const work = workRef.current.checked ? "work" : "";
    const home = homeRef.current.checked ? "home" : "";
    const other = otherRef.current.checked ? "other" : "";
    const date = dateRef.current.value;
    const categories = [health, work, home, other].filter(Boolean).join(", ");

    const newTask = {
      title: taskName,
      category: categories,
      date: date,
      completed: false,
    };

    makeHttpRequest("http://localhost:3004/tasks", "POST", newTask)
      .then((data) => {
        onClose();
        onAddTask(newTask);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <h2>Add New Task</h2>
        <Input
          styles="taskName"
          type="text"
          placeholder="Task Title"
          inputRef={(el) => (taskNameRef.current = el)}
        />
        <div className={classes.checkboxAndDateContainer}>
          <div>
            <input
              ref={healthRef}
              className={classes.health}
              type="checkbox"
              id="health"
            />
            <label htmlFor="health" className={classes.health_label}>
              <span className={classes.checkbox_text}>health</span>
            </label>
            <input
              ref={workRef}
              className={classes.work}
              type="checkbox"
              id="work"
            />
            <label htmlFor="work" className={classes.work_label}>
              <span className={classes.checkbox_text}>work</span>
            </label>
            <input
              ref={homeRef}
              type="checkbox"
              id="home"
              className={classes.home}
            />
            <label htmlFor="home" className={classes.home_label}>
              <span className={classes.checkbox_text}>home</span>
            </label>
            <input
              ref={otherRef}
              type="checkbox"
              id="other"
              className={classes.other}
            />
            <label htmlFor="other" className={classes.other_label}>
              <span className={classes.checkbox_text}>other</span>
            </label>
          </div>
          <div>
            <input ref={dateRef} className={classes.date} type="date" />
          </div>
        </div>
        <div className={classes.button_container}>
          <Button
            type="button"
            placeholder="cancel"
            onClick={onClose}
            styles="cancel"
          />
          <Button
            type="button"
            placeholder="Add Task"
            styles="add"
            onClick={taskAddHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
