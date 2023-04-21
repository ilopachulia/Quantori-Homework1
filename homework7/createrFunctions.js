// create element functions
export function createElementWithClasses(elementType, classes) {
  const element = document.createElement(elementType);
  classes.forEach((className) => element.classList.add(className));
  return element;
}

// create element function for only INPUTS
export function createInputWithClasses(type, placeholder, classes) {
  const input = document.createElement("input");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("type", type);
  classes.forEach((className) => input.classList.add(className));
  return input;
}

// create checkbox functions
export function createCheckboxWithLabel(value, classes) {
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

export function createDateInputWithClasses(placeholder, classes) {
  const input = document.createElement("input");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("type", "date");
  classes.forEach((className) => input.classList.add(className));

  return input;
}

export function createCheckboxWithoutLabel(className) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add(className);
  return checkbox;
}

export function setInnerHtml(element, html) {
  element.innerHTML = html;
}
