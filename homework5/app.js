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
    const [modalContainer, setModalContainer] = useState(null);

    function openModal() {
      const body = document.querySelector("body");
      body.style.backgroundColor = "#D2D2D2";

      const container = createElementWithClasses("div", ["modalContainer"]);
      const header = createElementWithClasses("h1", ["heading"]);
      setInnerHtml(header, "Add New Task");
      const input = createInputWithClasses("text", "Task Title", [
        "modalInput",
      ]);

      const buttonContainer = createElementWithClasses("div", [
        "buttonContainer",
      ]);

      const cancel = Button({ text: "Cancel", onClick: cancelModal });
      cancel.setAttribute("id", "cancel-btn");

      const add = Button({ text: "Add Task", onClick: addTask });

      buttonContainer.append(cancel, add);
      container.append(header, input, buttonContainer);

      setModalContainer(container);

      function addTask() {
        const body = document.querySelector("body");
        body.style.backgroundColor = "#fff";

        const inputField = document.querySelector(".modalInput");
        const inputValue = inputField.value;
        setItems([...items, inputValue]);
        inputField.value = "";
      }

      function cancelModal() {
        const body = document.querySelector("body");
        body.style.backgroundColor = "#fff";

        setModalContainer(null);
      }
    }

    const mainContainer = createElementWithClasses("main", ["main-container"]);
    const searchFieldWrapper = createElementWithClasses("div", [
      "searchFieldWrapper",
    ]);
    const heading = createElementWithClasses("h1", ["heading"]);
    setInnerHtml(heading, "To Do List");
    const searchField = createInputWithClasses("search", "Search Task", [
      "inputField",
    ]);
    const button = Button({ text: "+ New Task", onClick: openModal });
    const list = List({ items });
    searchFieldWrapper.append(searchField, button);
    mainContainer.append(heading, searchFieldWrapper, list, modalContainer);
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
