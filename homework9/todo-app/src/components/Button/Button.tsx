import "./button.css";

interface IButtonProps {
  placeholder: string;
  type?: "button" | "submit" | "reset";
  styles: string;
  onClick: () => void;
}

const Button = ({ placeholder, type, styles, onClick }: IButtonProps) => {
  return (
    <div>
      <button type={type} className={styles} onClick={onClick}>
        {placeholder}
      </button>
    </div>
  );
};

export default Button;
