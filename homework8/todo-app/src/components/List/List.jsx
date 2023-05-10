import React from "react";
import classes from "./list.module.css";
import deleteIcon from "../../assets/Shape.svg";

const List = ({ filteredTasks, handleComplete, deleteHandler }) => {
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
  return (
    <div>
      {filteredTasks.some((item) => !item.completed) && (
        <div>
          <h1>All Tasks</h1>
          {filteredTasks.map((item) => {
            if (!item.completed) {
              return (
                <div className={classes.listItem_container} key={item.id}>
                  <input
                    className={classes.input}
                    type="checkbox"
                    onChange={() => handleComplete(item)}
                  />
                  <div className={classes.listItem}>
                    <li>{item.title}</li>
                    <div className={classes.categoryAndDateContainer}>
                      <div
                        className={`${
                          classes.categoryAndDateContainer
                        } ${getCategoryClass(item.category)}`}
                      >
                        {item.category}
                      </div>
                      <div className={classes.date}>{item.date}</div>
                    </div>
                  </div>
                  <button
                    className={classes.deleteIcon}
                    onClick={() => deleteHandler(item.id)}
                  >
                    <img src={deleteIcon} alt="Delete" />
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
      {filteredTasks.some((item) => item.completed) && (
        <div>
          <h1>completed Tasks</h1>
          {filteredTasks.map((item) => {
            if (item.completed) {
              return (
                <div
                  className={`${classes.listItem_container} ${classes.completed_list}`}
                  key={item.id}
                >
                  <input
                    className={classes.input}
                    type="checkbox"
                    checked
                    onChange={() => handleComplete(item)}
                  />
                  <div className={classes.listItem}>
                    <li>{item.title}</li>
                    <div className={classes.categoryAndDateContainer}>
                      <div
                        className={`${
                          classes.categoryAndDateContainer
                        } ${getCategoryClass(item.category)}`}
                      >
                        {item.category}
                      </div>
                      <div className={classes.date}>{item.date}</div>
                    </div>
                  </div>
                  <button
                    className={classes.deleteIcon}
                    onClick={() => deleteHandler(item.id)}
                  >
                    <img src={deleteIcon} alt="Delete" />
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default List;
