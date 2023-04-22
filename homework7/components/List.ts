import {
  createElementWithClasses,
  createCheckboxWithoutLabel,
  setInnerHtml,
} from "../createrFunctions";

import "./List.css";

interface Task {
  id: number;
  task: string;
  completed: boolean;
  categories: string;
  date: string;
}

export function List({ items }: { items: Task[] }) {
  const listContainer = createElementWithClasses("div", ["listContainer"]);

  if (items.length > 0) {
    // Create heading for the list
    const heading = createElementWithClasses("h1", ["listHeading"]);
    setInnerHtml(heading, "All Tasks");
    listContainer.appendChild(heading);
  }
  for (let item of items) {
    const listItem = createElementWithClasses("div", ["listItem"]);
    const id = item.id;

    // Create container for checkmark and task
    const taskCheckContainer = createElementWithClasses("div", [
      "taskCheckContainer",
    ]);
    const checkMark = createCheckboxWithoutLabel("checkMark");
    taskCheckContainer.appendChild(checkMark);

    // updating completed list based on checkmarks
    checkMark.addEventListener("click", (event) => {
      // Update task completion status on the JSON Server
      fetch(`http://localhost:3000/tasks/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          completed: true,
        }),
      })
        .then((response) => response.json())
        .then((updatedTask) => {})
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
      dateString = date.toLocaleDateString("en-US");
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
