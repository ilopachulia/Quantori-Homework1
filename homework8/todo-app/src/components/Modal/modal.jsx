import React from "react";
import classes from "./modal.module.css";
import Button from "../Button/Button";

const Modal = ({ onClose }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <h2>Add New Task</h2>
        <input type="text" placeholder="Task Title" />
        
        <div className={classes.button_container}>
          <Button type="button" placeholder="cancel" onClick={onClose} />
          <Button type="button" placeholder="Add Task" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
