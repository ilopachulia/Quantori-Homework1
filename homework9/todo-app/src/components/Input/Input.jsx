import React from "react";
import classes from "./input.module.css";

const Input = ({
  styles,
  type,
  placeholder,
  id,
  onChange,
  inputRef,
  defaultValue,
}) => {
  return (
    <input
      defaultValue={defaultValue}
      ref={inputRef}
      className={classes[styles]}
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
