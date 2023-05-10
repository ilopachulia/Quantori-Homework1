import React, { useEffect } from "react";
import "./task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../store/task/task.action";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";
import { ITask } from "../../shared-Interfaces/sharedInterfaces";

interface ITaskProps {
  item: ITask;
  completed: boolean;
  editHandler?: (task: ITask) => void;
}

const Task = ({ item, completed, editHandler }: ITaskProps) => {
  const dispatch = useDispatch();

  const getCategoryClass = (category?: string) => {
    switch (category) {
      case "health":
        return "healthCategory";
      case "work":
        return "workCategory";
      case "home":
        return "homeCategory";
      default:
        return "otherCategory";
    }
  };

  useEffect(() => {
    const channel = new BroadcastChannel("taskChannel");
    channel.onmessage = (event) => {
      if (event.data.type === "delete") {
        if (event.data.id === item.id) {
          dispatch(deleteTask(item.id));
        }
      } else if (event.data.type === "update") {
        if (event.data.task.id === item.id) {
          dispatch(updateTask(event.data.task));
        }
      }
    };

    return () => {
      channel.close();
    };
  }, [item, dispatch]);

  const deleteHandler = (id?: number) => {
    const url = `http://localhost:3004/tasks/${id}`;
    makeHttpRequest(url, "DELETE")
      .then(() => {
        const channel = new BroadcastChannel("taskChannel");
        channel.postMessage({ type: "delete", id: id });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleComplete = (task: ITask) => {
    const url = `http://localhost:3004/tasks/${task.id}`;
    const updatedTask = { ...task, completed: !task.completed };
    makeHttpRequest(url, "PUT", updatedTask)
      .then(() => {
        const channel = new BroadcastChannel("taskChannel");
        channel.postMessage({ type: "update", task: updatedTask });
      })
      .catch((error) => console.log(error));
  };

  const dataLifter = (task: ITask) => {
    if (editHandler) {
      editHandler(task);
    }
  };

  return (
    <div
      className={"listItem_Container " + (completed ? "completedList" : "")}
      key={item.id}
    >
      <input
        className="input"
        type="checkbox"
        checked={completed}
        onChange={() => handleComplete(item)}
      />
      <div className="listItem">
        <li>{item.title}</li>
        <div className="CategoryAndDateContainer">
          <div className={`${getCategoryClass(item.category)}`}>
            {item.category}
          </div>
          <div className="listDate">{item.date}</div>
        </div>
      </div>
      <div className="EditAndDeleteContainer">
        {!completed && (
          <FontAwesomeIcon
            className="icon"
            icon={faEdit}
            onClick={() => dataLifter(item)}
          />
        )}
        <FontAwesomeIcon
          icon={faTrash}
          className="deleteIcon"
          onClick={() => deleteHandler(item.id)}
        />
      </div>
    </div>
  );
};

export default Task;
