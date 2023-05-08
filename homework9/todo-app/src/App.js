import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import NewTask from "./components/NewTask/newTask";
import SearchField from "./components/SearchField/searchField";
import { makeHttpRequest } from "./HelperFunctions/makeHttpRequest";
import { setTasks } from "./store/task/task.action";

function App() {
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

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

  return (
    <div className="main">
      <div className="wrapper">
        <Header />
        <div className="searchAndNewTaskContainer">
          <SearchField onSearchChange={onSearchChange} />
          <NewTask />
        </div>
        <List filteredTasks={filteredTasks} />
      </div>
    </div>
  );
}

export default App;
