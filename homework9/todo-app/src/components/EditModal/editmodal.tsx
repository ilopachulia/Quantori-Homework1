import React, { useState } from "react";
import "./modal.css";

import Button from "../Button/Button";
import Input from "../Input/Input";
import { useDispatch } from "react-redux";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";
import { updateTask } from "../../store/task/task.action";
import { ITask } from "../../shared-Interfaces/sharedInterfaces";

interface IEditModalProps {
  onClose: () => void;
  editTask: ITask;
}

const EditModal = ({ onClose, editTask }: IEditModalProps) => {
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
    const updatedTask: ITask = { id, title, category, date };
    makeHttpRequest(`http://localhost:3004/tasks/${id}`, "PUT", updatedTask)
      .then((task: ITask) => {
        dispatch(updateTask(task));
        onClose();
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className="modal">
      <div className="content">
        <h2>Edit Task</h2>
        <Input
          styles="taskName"
          type="text"
          placeholder="Task Title"
          defaultValue={title}
          onChange={handleTitleChange}
        />
        <div className="checkboxAndDateContainer">
          <div>
            <input
              className="health"
              type="radio"
              id="health"
              value="health"
              checked={category === "health"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="health" className="health_label">
              <span className="checkbox_text">health</span>
            </label>
            <input
              className="work"
              type="radio"
              id="work"
              value="work"
              checked={category === "work"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="work" className="work_label">
              <span className="checkbox_text">work</span>
            </label>
            <input
              type="radio"
              id="home"
              className="home"
              value="home"
              checked={category === "home"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="home" className="home_label">
              <span className="checkbox_text">home</span>
            </label>
            <input
              type="radio"
              id="other"
              className="other"
              value="other"
              checked={category === "other"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="other" className="other_label">
              <span className="checkbox_text">other</span>
            </label>
          </div>
          <div>
            <input
              className="date"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="button_container">
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
