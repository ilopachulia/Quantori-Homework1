export function createElementWithClasses(
  elementType: string,
  classes: string[]
): HTMLElement {
  const element = document.createElement(elementType);
  classes.forEach((className) => element.classList.add(className));
  return element;
}

export function createInputWithClasses(
  type: string,
  placeholder: string,
  classes: string[]
): HTMLInputElement {
  const input = document.createElement("input");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("type", type);
  classes.forEach((className) => input.classList.add(className));
  return input;
}

export function createCheckboxWithLabel(
  value: string,
  classes: string[]
): HTMLLabelElement {
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

export function createDateInputWithClasses(
  placeholder: string,
  classes: string[]
): HTMLInputElement {
  const input = document.createElement("input");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("type", "date");
  classes.forEach((className) => input.classList.add(className));

  return input;
}

export function createCheckboxWithoutLabel(
  className: string
): HTMLInputElement {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add(className);
  return checkbox;
}

export function setInnerHtml(element: HTMLElement, html: string): void {
  element.innerHTML = html;
}
