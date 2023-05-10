import { ChangeEventHandler, RefObject } from "react";
import "./input.css";

interface IInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputRef?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined;
  placeholder: string;
  styles: string;
  type: string;
  defaultValue?: string;
}

const Input = ({
  styles,
  type,
  placeholder,
  onChange,
  inputRef,
  defaultValue,
}: IInputProps) => {
  return (
    <input
      defaultValue={defaultValue}
      ref={inputRef}
      className={styles}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
