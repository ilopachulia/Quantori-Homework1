import React, { useState } from "react";
import classes from "./modal.module.css";

import Button from "../Button/Button";
import Input from "../Input/Input";
import { useDispatch } from "react-redux";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";
import { updateTask } from "../../store/task/task.action";

const EditModal = ({ onClose, editTask }) => {
  const {
    id,
    title: initialTitle,
    category: initialCategory,
    date: initialDate,
  } = editTask;
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);
  const [date, setDate] = useState(initialDate);

  const taskEditHandler = () => {
    const updatedTask = { id, title, category, date };
    makeHttpRequest(`http://localhost:3004/tasks/${id}`, "PUT", updatedTask)
      .then((task) => {
        dispatch(updateTask(task));
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <h2>Edit Task</h2>
        <Input
          styles="taskName"
          type="text"
          placeholder="Task Title"
          defaultValue={title}
          onChange={handleTitleChange}
        />
        <div className={classes.checkboxAndDateContainer}>
          <div>
            <input
              className={classes.health}
              type="radio"
              id="health"
              value="health"
              checked={category === "health"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="health" className={classes.health_label}>
              <span className={classes.checkbox_text}>health</span>
            </label>
            <input
              className={classes.work}
              type="radio"
              id="work"
              value="work"
              checked={category === "work"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="work" className={classes.work_label}>
              <span className={classes.checkbox_text}>work</span>
            </label>
            <input
              type="radio"
              id="home"
              className={classes.home}
              value="home"
              checked={category === "home"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="home" className={classes.home_label}>
              <span className={classes.checkbox_text}>home</span>
            </label>
            <input
              type="radio"
              id="other"
              className={classes.other}
              value="other"
              checked={category === "other"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="other" className={classes.other_label}>
              <span className={classes.checkbox_text}>other</span>
            </label>
          </div>
          <div>
            <input
              className={classes.date}
              type="date"
              value={date}
              onChange={handleDateChange}
            />
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
            placeholder="Update Task"
            styles="add"
            onClick={taskEditHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default EditModal;
