// Add the HTML elements to the DOM
const main = document.querySelector("main");

// Create wrapper div for heading
const headingWrapper = document.createElement("div");
headingWrapper.classList.add("heading-wrapper");

// Create heading element
const heading = document.createElement("h1");
heading.textContent = "To-Do List";
headingWrapper.appendChild(heading);

// Create wrapper div for input and button
const inputWrapper = document.createElement("div");
inputWrapper.classList.add("input-wrapper");

// Create input element
const input = document.createElement("input");
input.type = "search";
input.id = "searchInput";
input.placeholder = "Search Task";

// Create button element
const button = document.createElement("button");
button.id = "addButton";
button.textContent = "+ New Task";

// Add input and button to input wrapper
inputWrapper.appendChild(input);
inputWrapper.appendChild(button);

// Create list element
const listWrapper = document.createElement("div");
listWrapper.classList.add("list-wrapper");

// Create heading element for list container
const listHeading = document.createElement("h1");
listHeading.textContent = "All Tasks";
listWrapper.appendChild(listHeading);

// Create list element
const list = document.createElement("ul");
list.id = "todoList";

// Add list to list wrapper
listWrapper.appendChild(list);

// Add all elements to main container
main.appendChild(headingWrapper);
main.appendChild(inputWrapper);
main.appendChild(listWrapper);

// Create completed tasks section
const completedTasksWrapper = document.createElement("div");
completedTasksWrapper.classList.add("list-wrapper");

// Create completed tasks heading
const completedTasksHeading = document.createElement("h1");
completedTasksHeading.textContent = "Completed Tasks";
completedTasksWrapper.appendChild(completedTasksHeading);

// Create completed tasks list
const completedTasksList = document.createElement("ul");
completedTasksList.id = "completedTasksList";
completedTasksWrapper.appendChild(completedTasksList);

// Add completed tasks section to main container
main.appendChild(completedTasksWrapper);

// Add event listeners to the button and list items
button.addEventListener("click", () => {
  // Create a modal element
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // Create a modal content element
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Create a modal header element
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  // Create a title element
  const title = document.createElement("h2");
  title.textContent = "Add Task";

  // Add the title to the modal header
  modalHeader.appendChild(title);
  // Create a close button element
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.textContent = "X";

  // Add an event listener to the close button to close the modal
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Add the close button to the modal header
  modalHeader.appendChild(closeButton);

  // Add the modal header to the modal content
  modalContent.appendChild(modalHeader);

  // Create a form element
  const form = document.createElement("form");

  // Create a label element for the task title input field
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";

  // Create an input element for the task title
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "taskTitle";
  titleInput.placeholder = "Enter task title";

  // Add the label and input elements to the form
  titleLabel.appendChild(titleInput);
  form.appendChild(titleLabel);

  // Create a div element to hold the buttons
  const buttonDiv = document.createElement("div");

  // Create a cancel button element
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.classList.add("cancel-button");
  cancelButton.textContent = "Cancel";

  // Add an event listener to the cancel button to close the modal
  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Add the cancel button to the button div
  buttonDiv.appendChild(cancelButton);

  // Create an add button element
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("add-button");
  button.textContent = "Add";

  button.addEventListener("click", () => {
    const taskTitle = titleInput.value.trim();

    if (taskTitle !== "") {
      // Create a new task item
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.textContent = taskTitle;

      // Add the task item to the unfinished tasks list
      const todoList = document.getElementById("todoList");
      todoList.appendChild(taskItem);

      // Clear the task title input field
      titleInput.value = "";

      // Close the modal
      modal.style.display = "none";
    }
  });
});
