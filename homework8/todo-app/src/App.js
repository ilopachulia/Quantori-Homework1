import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/header";
import List from "./components/List/List";
import NewTask from "./components/NewTask/newTask";
import SearchField from "./components/SearchField/searchField";
import { makeHttpRequest } from "./HelperFunctions/makeHttpRequest";

function App() {
  const [searchField, setSearchField] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    makeHttpRequest("http://localhost:3004/tasks")
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchField)
    );
    setFilteredTasks(filteredTasks);
  }, [tasks, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const handleComplete = (task) => {
    const url = `http://localhost:3004/tasks/${task.id}`;
    const updatedTask = { ...task, completed: !task.completed };
    makeHttpRequest(url, "PUT", updatedTask)
      .then(() => {
        const updatedTasks = tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.log(error));
  };

  const deleteHandler = (id) => {
    const url = `http://localhost:3004/tasks/${id}`;
    makeHttpRequest(url, "DELETE")
      .then(() => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  };

  return (
    <div className="main">
      <div className="wrapper">
        <Header />
        <div className="searchAndNewTaskContainer">
          <SearchField onSearchChange={onSearchChange} />
          <NewTask onAddTask={onAddTask} />
        </div>
        <List
          filteredTasks={filteredTasks}
          handleComplete={handleComplete}
          deleteHandler={deleteHandler}
        />
      </div>
    </div>
  );
}

export default App;
