import React from "react";
import classes from "./button.module.css";

const Button = ({ placeholder, type, styles, onClick }) => {
  return (
    <div>
      <button type={type} className={classes[styles]} onClick={onClick}>
        {placeholder}
      </button>
    </div>
  );
};

export default Button;
