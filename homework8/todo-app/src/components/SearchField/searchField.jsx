import React from "react";
import Input from "../Input/input";

const SearchField = ({ onSearchChange }) => {
  const onChangeHandler = (event) => {
    const searchValue = event.target.value;
    onSearchChange(searchValue); // pass the value to the parent component
  };
  return (
    <Input
      styles="searchField"
      type="search"
      placeholder="Search Task"
      name="search_term"
      onChange={onChangeHandler}
    />
  );
};

export default SearchField;
