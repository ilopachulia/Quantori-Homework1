import React from "react";
import classes from "./weather.module.css";
import { useEffect, useState } from "react";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${"355f5086f874430c9e1130753231504"}&q=Tbilisi&aqi=no`;
    makeHttpRequest(url)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {weatherData && (
        <div className={classes.weather_container}>
          <img
            className={classes.icon}
            src={weatherData.current.condition.icon}
            alt="weather icon"
          />
          <p className={classes.temperature}>{weatherData.current.temp_c}°</p>
          <p className={classes.location}>{weatherData.location.name}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
