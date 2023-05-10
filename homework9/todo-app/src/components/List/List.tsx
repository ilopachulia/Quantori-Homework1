import React from "react";
import Task from "../Task/task";
import { ITask } from "../../shared-Interfaces/sharedInterfaces";

interface IListProps {
  filteredTasks: ITask[];
  editHandler: (task: ITask) => void;
}

const List: React.FC<IListProps> = ({ filteredTasks, editHandler }) => {
  return (
    <div>
      {filteredTasks.some((item) => !item.completed) && (
        <div>
          <h1>All Tasks</h1>
          {filteredTasks.map((item) => {
            if (!item.completed) {
              return (
                <Task
                  key={item.id}
                  item={item}
                  completed={false}
                  editHandler={editHandler}
                />
              );
            }
            return null;
          })}
        </div>
      )}

      {filteredTasks.some((item) => item.completed) && (
        <div>
          <h1>Completed Tasks</h1>
          {filteredTasks.map((item) => {
            if (item.completed) {
              return <Task key={item.id} item={item} completed={true} />;
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default List;
