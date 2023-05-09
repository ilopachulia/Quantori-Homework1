import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import NewTask from "./components/NewTask/newTask";
import SearchField from "./components/SearchField/searchField";
import { makeHttpRequest } from "./HelperFunctions/makeHttpRequest";
import { setTasks } from "./store/task/task.action";
import Navigation from "./components/DropDown/navigation";
import EditModal from "./components/EditModal/editmodal";

function App() {
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    makeHttpRequest("http://localhost:3004/tasks")
      .then((data) => {
        dispatch(setTasks(data));
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchField)
  );

  const onSearchChange = (event) => {
    const searchFieldString = event.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const editHandler = (task) => {
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
