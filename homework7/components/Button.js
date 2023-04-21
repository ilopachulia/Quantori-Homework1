export function Button({ text, onClick, disabled, className }) {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.onclick = onClick;
  button.disabled = disabled;
  button.className = className;
  return button;
}
