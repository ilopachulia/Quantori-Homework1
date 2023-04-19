// APPLICATION

(function () {
  let state = undefined;

  //
  //    Global application state
  //    @template T
  //    @param {T} initialValue
  //    @returns {[T, function(T): void]}
  //

  function useState(initialValue) {
    state = state || initialValue;

    function setValue(newValue) {
      state = newValue;
      renderApp();
    }

    return [state, setValue];
  }

  function useEffect(callback, dependencies) {
    const hasNoDeps = !dependencies;
    const [deps, setDeps] = useState(dependencies);

    if (hasNoDeps || deps) {
      const cleanup = callback();
      if (deps) {
        setDeps(undefined);
      }
      return cleanup;
    }
  }
  //
  //     Button component
  //     @param text {string}
  //    @param onClick {function}
  //   @returns {HTMLButtonElement} - Button element
  //
  function Button({ text, onClick }) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    return button;
  }

  // create element functions
  function createElementWithClasses(elementType, classes) {
    const element = document.createElement(elementType);
    classes.forEach((className) => element.classList.add(className));
    return element;
  }

  // create element function for only INPUTS
  function createInputWithClasses(type, placeholder, classes) {
    const input = document.createElement("input");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("type", type);
    classes.forEach((className) => input.classList.add(className));
    return input;
  }

  // create checkbox functions
  function createCheckboxWithLabel(value, classes) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const id = value;

    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "option");
    input.setAttribute("value", value);
    input.setAttribute("id", id);
    label.setAttribute("for", id);

    label.appendChild(input);
    label.appendChild(document.createTextNode(value));

    classes.forEach((className) => label.classList.add(className));
    label.addEventListener("click", () => {
      label.style.border = "1px solid green";
    });
    return label;
  }

  function createDateInputWithClasses(placeholder, classes) {
    const input = document.createElement("input");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("type", "date");
    classes.forEach((className) => input.classList.add(className));

    return input;
  }

  function createCheckboxWithoutLabel(className) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(className);
    return checkbox;
  }

  function List({ items }) {
    const listContainer = createElementWithClasses("div", ["listContainer"]);

    if (items.length > 0) {
      // Create heading for the list
      const heading = createElementWithClasses("h1", ["listHeading"]);
      setInnerHtml(heading, "All Tasks");
      listContainer.appendChild(heading);
    }
    for (let item of items) {
      const id = item.id;
      const listItem = createElementWithClasses("div", ["listItem"]);

      // Create container for checkmark and task
      const taskCheckContainer = createElementWithClasses("div", [
        "taskCheckContainer",
      ]);
      const checkMark = createCheckboxWithoutLabel("checkMark");
      taskCheckContainer.appendChild(checkMark);

      // updating completed list based on checkmarks

      checkMark.addEventListener("click", (event) => {
        // Update the data on the server
        fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((response) => response.json())
          .then((updatedItem) => {
            console.log(`Item with id ${id} updated:`, updatedItem);
          })
          .catch((error) => console.error(error));

        listContainer.removeChild(listItem);

        // Send data to the JSON Server
        fetch("http://localhost:3000/completedTasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      });

      // Create container for task details
      const taskContainer = createElementWithClasses("div", ["taskContainer"]);
      const taskName = createElementWithClasses("h1", ["taskName"]);
      setInnerHtml(taskName, item.task);
      taskContainer.appendChild(taskName);

      const taskDetails = createElementWithClasses("div", ["taskDetails"]);

      const checkedCategory = createElementWithClasses("div", [
        "checkedCategory",
      ]);

      // here I am styling task list components' categories, using previously defined classes, items.categories are the value names, same as the class names: home, work, other, health..
      switch (item.categories) {
        case "health":
          checkedCategory.classList.add(item.categories);
          break;
        case "work":
          checkedCategory.classList.add(item.categories);
          break;
        case "home":
          checkedCategory.classList.add(item.categories);
          break;
        default:
          checkedCategory.classList.add(item.categories);
          break;
      }
      setInnerHtml(checkedCategory, item.categories);
      taskDetails.appendChild(checkedCategory);

      const date = new Date(item.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let dateString;
      if (date.toDateString() === today.toDateString()) {
        dateString = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateString = "Yesterday";
      } else if (date.toDateString() === tomorrow.toDateString()) {
        dateString = "Tomorrow";
      } else {
        const options = { weekday: "long", day: "numeric", month: "short" };
        dateString = date.toLocaleDateString("en-US", options);
      }

      const dateElement = createElementWithClasses("div", ["dateElement"]);
      setInnerHtml(dateElement, dateString);
      taskDetails.appendChild(dateElement);

      taskContainer.appendChild(taskDetails);
      taskCheckContainer.appendChild(taskContainer);
      listItem.appendChild(taskCheckContainer);

      // Create container for delete button
      const deleteContainer = createElementWithClasses("div", [
        "deleteContainer",
      ]);

      const deleteButton = document.createElement("img");
      deleteButton.src = "./Shape.svg"; // changed deleteButton from button element to img element

      deleteContainer.appendChild(deleteButton);
      listItem.appendChild(deleteContainer);

      // Add click event listener to delete button
      deleteButton.addEventListener("click", () => {
        fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((response) => response.json())
          .then((updatedItem) => {
            console.log(`Item with id ${item.id} updated:`, updatedItem);
          })
          .catch((error) => console.error(error));
        listContainer.removeChild(listItem);
      });
      listContainer.appendChild(listItem);
    }

    return listContainer;
  }

  function CompletedList({ items }) {
    const listContainer = createElementWithClasses("div", ["listContainer"]);

    if (items.length > 0) {
      // Create heading for the list
      const heading = createElementWithClasses("h1", ["listHeading"]);
      setInnerHtml(heading, "Completed Tasks");
      listContainer.appendChild(heading);
    }

    for (item of items) {
      const listItem = createElementWithClasses("div", ["listItem"]);

      // Create container for checkmark and task
      const taskCheckContainer = createElementWithClasses("div", [
        "taskCheckContainer",
        "completed",
      ]);
      const checkMark = createCheckboxWithoutLabel("checkMark");
      checkMark.checked = true;
      taskCheckContainer.appendChild(checkMark);

      // Create container for task details
      const taskContainer = createElementWithClasses("div", [
        "taskContainer",
        "completed",
      ]);
      const taskName = createElementWithClasses("h1", [
        "taskName",
        "completed",
      ]);
      setInnerHtml(taskName, item.task);
      taskContainer.appendChild(taskName);

      const taskDetails = createElementWithClasses("div", [
        "taskDetails",
        "completed",
      ]);

      const checkedCategory = createElementWithClasses("div", [
        "checkedCategory",
        "completedCategory",
      ]);

      switch (item.categories) {
        case "health":
          checkedCategory.classList.add(item.categories);
          break;
        case "work":
          checkedCategory.classList.add(item.categories);
          break;
        case "home":
          checkedCategory.classList.add(item.categories);
          break;
        default:
          checkedCategory.classList.add(item.categories);
          break;
      }
      setInnerHtml(checkedCategory, item.categories);
      taskDetails.appendChild(checkedCategory);

      const date = new Date(item.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let dateString;
      if (date.toDateString() === today.toDateString()) {
        dateString = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateString = "Yesterday";
      } else if (date.toDateString() === tomorrow.toDateString()) {
        dateString = "Tomorrow";
      } else {
        const options = { weekday: "long", day: "numeric", month: "short" };
        dateString = date.toLocaleDateString("en-US", options);
      }

      const dateElement = createElementWithClasses("div", ["dateElement"]);
      setInnerHtml(dateElement, dateString);
      taskDetails.appendChild(dateElement);

      taskContainer.appendChild(taskDetails);
      taskCheckContainer.appendChild(taskContainer);
      listItem.appendChild(taskCheckContainer);

      listContainer.appendChild(listItem);
    }

    return listContainer;
  }

  // creates elements text

  function setInnerHtml(element, html) {
    element.innerHTML = html;
  }

  //    App container
  //    @returns {HTMLDivElement} - The app container

  function App() {
    let tasks = [];

    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        tasks = tasks.concat(data);
        const list = List({ items: tasks });
        mainContainer.append(list);
      })
      .catch((error) => console.error(error));

    function handleSearch(event) {
      const searchQuery = event.target.value.toLowerCase();
      const filteredData = tasks.filter((item) =>
        item.task.toLowerCase().includes(searchQuery)
      );
      console.log("filter", filteredData);
      const list = List({ items: filteredData });
      const listContainer = document.getElementsByClassName("listContainer")[0];
      mainContainer.replaceChild(list, listContainer);
    }

    // modal component functions
    function openModal() {
      const body = document.querySelector("body");
      body.style.backgroundColor = "#D2D2D2";

      modal.style.display = "block";
    }

    function cancelModal() {
      const body = document.querySelector("body");
      body.style.backgroundColor = "#fff";
      modal.style.display = "none";
    }

    function addTask() {
      const body = document.querySelector("body");
      body.style.backgroundColor = "#fff";

      const inputField = document.querySelector(".modalInput");
      const inputValue = inputField.value;

      const checkboxAndDateContainer = document.querySelector(
        ".checkboxAndDateContainer"
      );
      const checkbox = checkboxAndDateContainer.querySelector(
        'input[type="checkbox"]:checked'
      );
      const selectedCheckbox = checkbox ? checkbox.value : null; // Now user send not an array, but string. only one option

      const dateInput = checkboxAndDateContainer.querySelector(".date");
      const selectedDate = dateInput.value;

      const newItem = {
        task: inputValue,
        categories: selectedCheckbox,
        date: selectedDate,
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

    fetch("http://localhost:3000/completedTasks")
      .then((response) => response.json())
      .then((fetchData) => {
        const completedTasks = fetchData;
        const list = CompletedList({ items: completedTasks });
        mainContainer.append(list);
      })
      .catch((error) => console.error(error));

    // main content functions
    const mainContainer = createElementWithClasses("main", ["main-container"]);

    // modal as an additional wrapper is needed because, property display: block, which makes impossible to use display flex; I used display block for outsider wrapper, and display flex, for inside wrapper;
    const modal = createElementWithClasses("div", ["modal"]);

    const modalContainer = createElementWithClasses("div", ["modalContainer"]);

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

    const health = createCheckboxWithLabel("health", ["health"]);
    const work = createCheckboxWithLabel("work", ["work"]);
    const home = createCheckboxWithLabel("home", ["home"]);
    const other = createCheckboxWithLabel("other", ["other"]);

    checkboxContainer.append(health, work, home, other);

    // Create the date input element with classes
    const dateInput = createDateInputWithClasses("Select a date", ["date"]);

    const buttonContainer = createElementWithClasses("div", [
      "buttonContainer",
    ]);

    const cancel = Button({ text: "Cancel", onClick: cancelModal });
    cancel.setAttribute("id", "cancel-btn");

    const add = Button({ text: "Add Task", onClick: addTask });

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

// !! search should be implemented.
