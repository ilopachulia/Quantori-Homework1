import "./App.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import NewTask from "./components/NewTask/newTask";
import SearchField from "./components/SearchField/searchField";
import { makeHttpRequest } from "./HelperFunctions/makeHttpRequest";
import { setTasks } from "./store/task/task.action";
import Navigation from "./components/DropDown/navigation";
import EditModal from "./components/EditModal/editmodal";
import { ITask } from "./shared-Interfaces/sharedInterfaces";
import { RootState } from "./store/root-reducer";

function App() {
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<ITask>({} as ITask);

  useEffect(() => {
    makeHttpRequest("http://localhost:3004/tasks")
      .then((data) => {
        const tasks = data as ITask[];
        dispatch(setTasks(tasks));
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  const filteredTasks = tasks.filter((task: ITask) =>
    task.title?.toLowerCase().includes(searchField)
  );

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString: string = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const editHandler = (task: ITask) => {
    setShowModal(true);
    setEditTask(task);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="main">
      <div className="wrapper">
        <Header />
        <div className="searchAndNewTaskContainer">
          <SearchField onSearchChange={onSearchChange} />
          <NewTask />
        </div>
        <Navigation />
        <List filteredTasks={filteredTasks} editHandler={editHandler} />
        {showModal && (
          <EditModal editTask={editTask} onClose={handleModalClose} />
        )}
      </div>
    </div>
  );
}

export default App;
