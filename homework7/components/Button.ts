import "./Button.css";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export function Button({
  text,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.onclick = onClick;
  button.disabled = disabled;
  button.className = className;
  return button;
}
