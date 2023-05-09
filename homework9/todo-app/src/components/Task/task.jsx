import React from "react";
import classes from "./task.module.css";
import deleteIcon from "../../assets/Shape.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../store/task/task.action";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";

const Task = ({ item, completed, editHandler }) => {
  const dispatch = useDispatch();

  const getCategoryClass = (category) => {
    switch (category) {
      case "health":
        return classes.health;
      case "work":
        return classes.work;
      case "home":
        return classes.home;
      default:
        return classes.other;
    }
  };

  const deleteHandler = (id) => {
    const url = `http://localhost:3004/tasks/${id}`;
    makeHttpRequest(url, "DELETE")
      .then(() => {
        dispatch(deleteTask(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleComplete = (task) => {
    const url = `http://localhost:3004/tasks/${task.id}`;
    const updatedTask = { ...task, completed: !task.completed };
    makeHttpRequest(url, "PUT", updatedTask)
      .then(() => {
        dispatch(updateTask(updatedTask));
      })
      .catch((error) => console.log(error));
  };

  const dataLifter = (task) => {
    editHandler(task);
  };

  return (
    <div
      className={`${classes.listItem_container} ${
        completed ? classes.completed_list : ""
      }`}
      key={item.id}
    >
      <input
        className={classes.input}
        type="checkbox"
        checked={completed}
        onChange={() => handleComplete(item)}
      />
      <div className={classes.listItem}>
        <li>{item.title}</li>
        <div className={classes.categoryAndDateContainer}>
          <div className={`${getCategoryClass(item.category)}`}>
            {item.category}
          </div>
          <div className={classes.date}>{item.date}</div>
        </div>
      </div>
      <div className={classes.editAndDeleteContainer}>
        {!completed && (
          <FontAwesomeIcon icon={faEdit} onClick={() => dataLifter(item)} />
        )}
        <button
          className={classes.deleteIcon}
          onClick={() => deleteHandler(item.id)}
        >
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default Task;
