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

  //  Functional component for the list
  //  @param items {string[]}
  //    @returns {HTMLElement} - List element

  function List({ items }) {
    const listItems =
      items.length > 0 ? items.map((item) => `<li>${item}</li>`).join("") : "";
    const ul = document.createElement("ul");
    ul.innerHTML = listItems;
    return ul;
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

  // creates elements text
  function setInnerHtml(element, html) {
    element.innerHTML = html;
  }

  //    App container
  //    @returns {HTMLDivElement} - The app container

  function App() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

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
      setItems([...items, inputValue]);
      inputField.value = "";
    }

    let searchTimeoutId;

    function handleSearch(event) {
      // Clear any previously set timeout
      clearTimeout(searchTimeoutId);

      // Set a new timeout to call handleSearch after a delay
      searchTimeoutId = setTimeout(() => {
        const filteredItemsArr = items.filter((item) =>
          item.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredItems(filteredItemsArr);
      }, 500);
    }
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

    const buttonContainer = createElementWithClasses("div", [
      "buttonContainer",
    ]);

    const cancel = Button({ text: "Cancel", onClick: cancelModal });
    cancel.setAttribute("id", "cancel-btn");

    const add = Button({ text: "Add Task", onClick: addTask });

    buttonContainer.append(cancel, add);
    modalContainer.append(header, input, buttonContainer);

    const searchFieldWrapper = createElementWithClasses("div", [
      "searchFieldWrapper",
    ]);
    const heading = createElementWithClasses("h1", ["heading"]);
    setInnerHtml(heading, "To Do List");
    const searchField = createInputWithClasses("search", "Search Task", [
      "inputField",
    ]);

    // adding eventlistener to search input
    searchField.addEventListener("input", handleSearch);

    const button = Button({ text: "+ New Task", onClick: openModal });
    // const list = List({ items });
    //creating list using filteredItems
    const list = List({ items: filteredItems });

    searchFieldWrapper.append(searchField, button);
    mainContainer.append(heading, searchFieldWrapper, list, modal);
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
