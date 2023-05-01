import "./App.css";
import Header from "./components/Header/header";
import NewTask from "./components/NewTask/newTask";
import SearchField from "./components/SearchField/searchField";

function App() {
  return (
    <div className="main">
      <div className="wrapper">
        <Header />
        <div className="searchAndNewTaskContainer">
          <SearchField />
          <NewTask />
        </div>
      </div>
    </div>
  );
}

export default App;
