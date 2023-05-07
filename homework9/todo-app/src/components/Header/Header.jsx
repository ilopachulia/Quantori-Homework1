import classes from "./header.module.css";
import Weather from "../WeatherWidget/weather";

const Header = () => {
  return (
    <div className={classes.header_container}>
      <h1>To Do List</h1>
      <Weather />
    </div>
  );
};

export default Header;
