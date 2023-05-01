import React from "react";
import classes from "./input.module.css";

const Input = ({ styles, type, placeholder, onChange }) => {
  return (
    <input
      className={classes[styles]}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
