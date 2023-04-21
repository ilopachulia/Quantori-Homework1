import { List } from "../components/List.js";
import { CompletedList } from "../components/CompletedList.js";
import { Button } from "../components/Button.js";

import {
  createElementWithClasses,
  setInnerHtml,
  createInputWithClasses,
  createCheckboxWithLabel,
  createDateInputWithClasses,
} from "../createrFunctions.js";

// APPLICATION
(function () {
  function App() {
    let tasks = [];

    // main content functions

    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        tasks = tasks.concat(data.filter((item) => !item.completed));

        const list = List({ items: tasks });
        mainContainer.append(list);
      })
      .catch((error) => console.error(error));

    function handleSearch(event) {
      const searchQuery = event.target.value.toLowerCase();
      const filteredData = tasks.filter((item) =>
        item.task.toLowerCase().includes(searchQuery)
      );
      const list = List({ items: filteredData });
      const listContainer = document.getElementsByClassName("listContainer")[0];
      mainContainer.replaceChild(list, listContainer);
    }

    // modal component functions
    function openModal() {
      modal.style.display = "block";

      const addButton = document.querySelector(".addButton");
      addButton.disabled = true;

      const inputField = document.querySelector(".modalInput");
      const checkboxAndDateContainer = document.querySelector(
        ".checkboxAndDateContainer"
      );
      const checkbox = checkboxAndDateContainer.querySelector(
        'input[type="checkbox"]'
      );
      const dateInput = checkboxAndDateContainer.querySelector(".date");

      inputField.addEventListener("input", checkInputs);
      checkbox.addEventListener("change", checkInputs);
      dateInput.addEventListener("change", checkInputs);

      function checkInputs() {
        if (
          inputField.value.trim() === "" ||
          checkboxAndDateContainer.querySelector(
            'input[type="checkbox"]:checked'
          ) === null ||
          dateInput.value === ""
        ) {
          addButton.disabled = true;
        } else {
          addButton.disabled = false;
        }
      }
    }

    function cancelModal() {
      const body = document.querySelector("body");
      body.style.backgroundColor = "#fff";
      modal.style.display = "none";
    }

    function addTask() {
      const inputField = document.querySelector(".modalInput");
      const inputValue = inputField.value;

      const checkboxAndDateContainer = document.querySelector(
        ".checkboxAndDateContainer"
      );
      const checkbox = checkboxAndDateContainer.querySelector(
        'input[type="checkbox"]:checked'
      );
      const selectedCheckbox = checkbox ? checkbox.value : null;

      const dateInput = checkboxAndDateContainer.querySelector(".date");
      const selectedDate = dateInput.value;

      const newItem = {
        task: inputValue,
        categories: selectedCheckbox,
        date: selectedDate,
        completed: false,
      };

      // Send data to the JSON Server
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

      inputField.value = "";
    }

    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((fetchData) => {
        const completedTasks = fetchData.filter((task) => task.completed);
        const list = CompletedList({ items: completedTasks });
        mainContainer.append(list);
      })
      .catch((error) => console.error(error));

    const mainContainer = createElementWithClasses("main", ["main-container"]);

    // modal as an additional wrapper is needed because, property display: block, which makes impossible to use display flex; I used display block for outsider wrapper, and display flex, for inside wrapper;
    const modalContainer = createElementWithClasses("div", ["modal"]);

    const modal = createElementWithClasses("div", ["modalContainer"]);

    modal.append(modalContainer);

    // modal by default
    modal.style.display = "none";

    const header = createElementWithClasses("h1", ["heading"]);
    setInnerHtml(header, "Add New Task");
    const input = createInputWithClasses("text", "Task Title", ["modalInput"]);

    const checkboxAndDateContainer = createElementWithClasses("div", [
      "checkboxAndDateContainer",
    ]);

    const checkboxContainer = createElementWithClasses("div", [
      "checkboxContainer",
    ]);
    const tags = {
      health: ["health"],
      work: ["work"],
      home: ["home"],
      other: ["other"],
    };

    for (const key in tags) {
      if (Object.hasOwnProperty.call(tags, key)) {
        const checkbox = createCheckboxWithLabel(key, tags[key]);
        checkboxContainer.appendChild(checkbox);
      }
    }

    // Create the date input element with classes
    const dateInput = createDateInputWithClasses("Select a date", ["date"]);

    const buttonContainer = createElementWithClasses("div", [
      "buttonContainer",
    ]);

    const cancel = Button({ text: "Cancel", onClick: cancelModal });
    cancel.setAttribute("id", "cancel-btn");

    const add = Button({
      text: "Add Task",
      onClick: addTask,
      disabled: false,
      className: "addButton",
    });

    buttonContainer.append(cancel, add);
    checkboxAndDateContainer.append(checkboxContainer, dateInput);
    modalContainer.append(
      header,
      input,
      checkboxAndDateContainer,
      buttonContainer
    );

    const searchFieldWrapper = createElementWithClasses("div", [
      "searchFieldWrapper",
    ]);
    const headingAndWeatherContainer = createElementWithClasses("div", [
      "headingAndWeatherContainer",
    ]);
    const heading = createElementWithClasses("h1", ["heading"]);
    setInnerHtml(heading, "To Do List");

    const weatherContainer = createElementWithClasses("div", [
      "weatherContainer",
    ]);

    async function getWeatherData() {
      try {
        const response = await fetch(
          "http://api.weatherapi.com/v1/current.json?key=355f5086f874430c9e1130753231504&q=Tbilisi&aqi=yes"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        const temperature = data.current.temp_c + "°";
        const iconUrl = data.current.condition.icon;
        const location = data.location.name;

        return { temperature, iconUrl, location }; // Return the variables as an object
      } catch (error) {
        console.error(error);
      }
    }

    getWeatherData().then(({ temperature, iconUrl, location }) => {
      const icon = document.createElement("img");
      icon.src = iconUrl;
      const temperatureContainer = createElementWithClasses("div", [
        "temperatureContainer",
      ]);
      temperatureContainer.append(temperature);
      const locationContainer = createElementWithClasses("div", [
        "locationContainer",
      ]);
      locationContainer.append(location);

      weatherContainer.append(icon, temperatureContainer, locationContainer);
    });

    headingAndWeatherContainer.append(heading, weatherContainer);

    const searchField = createInputWithClasses("search", "Search Task", [
      "inputField",
    ]);

    // adding eventlistener to search input
    searchField.addEventListener("input", handleSearch);

    const button = Button({ text: "+ New Task", onClick: openModal });

    searchFieldWrapper.append(searchField, button);
    mainContainer.append(headingAndWeatherContainer, searchFieldWrapper, modal);
    return mainContainer;
  }

  /**
   * Render the app.
   * On change whole app is re-rendered.
   */
  function renderApp() {
    const appContainer = document.getElementById("functional-example");
    appContainer.innerHTML = "";
    appContainer.append(App());
  }

  // initial render
  renderApp();
})();
