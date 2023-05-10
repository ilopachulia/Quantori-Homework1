import "./header.css";
import Weather from "../WeatherWidget/weather";

const Header = (): JSX.Element => {
  return (
    <div className="header_container">
      <h1>To Do List</h1>
      <Weather />
    </div>
  );
};

export default Header;
