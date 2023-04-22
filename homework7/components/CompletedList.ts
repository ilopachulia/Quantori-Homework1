import {
  createElementWithClasses,
  createCheckboxWithLabel,
  createCheckboxWithoutLabel,
  setInnerHtml,
} from "../createrFunctions";

interface Task {
  id: number;
  task: string;
  completed: boolean;
  categories: string;
  date: string;
}

export function CompletedList({ items }: { items: Task[] }) {
  const listContainer = createElementWithClasses("div", ["listContainer"]);

  if (items.length > 0) {
    // Create heading for the list
    const heading = createElementWithClasses("h1", ["listHeading"]);
    setInnerHtml(heading, "Completed Tasks");
    listContainer.appendChild(heading);
  }

  for (let item of items) {
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
    const taskName = createElementWithClasses("h1", ["taskName", "completed"]);
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

    checkMark.addEventListener("click", (event) => {
      // Update task completion status on the JSON Server
      fetch(`http://localhost:3000/tasks/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          completed: false,
        }),
      })
        .then((response) => response.json())
        .then((updatedTask) => {})
        .catch((error) => console.error(error));
    });

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

    listContainer.appendChild(listItem);
  }

  return listContainer;
}
