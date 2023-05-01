import React from "react";
import Input from "../Input/Input";

const SearchField = () => {
  const onChangeHandler = () => {
    console.log("searching");
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
