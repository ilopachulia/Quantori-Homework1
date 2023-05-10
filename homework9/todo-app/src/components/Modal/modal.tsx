import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import "./modal.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { createTask } from "../../store/task/task.action";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";
import { ChangeEventHandler } from "react";

interface IModalProps {
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ onClose }) => {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const healthRef = useRef<HTMLInputElement>(null);
  const workRef = useRef<HTMLInputElement>(null);
  const homeRef = useRef<HTMLInputElement>(null);
  const otherRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // handle input change logic
  };
  const taskAddHandler = () => {
    const taskName = taskNameRef.current!.value;
    const health = healthRef.current!.checked ? "health" : "";
    const work = workRef.current!.checked ? "work" : "";
    const home = homeRef.current!.checked ? "home" : "";
    const other = otherRef.current!.checked ? "other" : "";
    const date = dateRef.current!.value;
    const categories = [health, work, home, other].filter(Boolean).join(", ");

    const newTask = {
      title: taskName,
      category: categories,
      date: date,
      completed: false,
    };

    makeHttpRequest("http://localhost:3004/tasks", "POST", newTask)
      .then((task) => {
        dispatch(createTask(task));
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });

    onClose();
  };
  return (
    <div className="modal">
      <div className="content">
        <h2>Add New Task</h2>
        <Input
          styles="taskName"
          type="text"
          placeholder="Task Title"
          inputRef={taskNameRef}
          onChange={handleInputChange}
        />
        <div className="checkboxAndDateContainer">
          <div>
            <input
              ref={healthRef}
              className="health"
              type="checkbox"
              id="health"
            />
            <label htmlFor="health" className="health_label">
              <span className="checkbox_text">health</span>
            </label>
            <input ref={workRef} className="work" type="checkbox" id="work" />
            <label htmlFor="work" className="work_label">
              <span className="checkbox_text">work</span>
            </label>
            <input ref={homeRef} type="checkbox" id="home" className="home" />
            <label htmlFor="home" className="home_label">
              <span className="checkbox_text">home</span>
            </label>
            <input
              ref={otherRef}
              type="checkbox"
              id="other"
              className="other"
            />
            <label htmlFor="other" className="other_label">
              <span className="checkbox_text">other</span>
            </label>
          </div>
          <div>
            <input ref={dateRef} className="date" type="date" />
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
