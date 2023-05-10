import React, { useEffect, useState } from "react";
import "./weather.css";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";

interface WeatherData {
  current: {
    condition: {
      icon: string;
    };
    temp_c: number;
  };
  location: {
    name: string;
  };
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${"355f5086f874430c9e1130753231504"}&q=Tbilisi&aqi=no`;
    makeHttpRequest(url)
      .then((data) => {
        const weather = data as WeatherData;
        setWeatherData(weather);
      })
      .catch((error: Error) => console.error(error));
  }, []);

  return (
    <div>
      {weatherData && (
        <div className="weather_container">
          <img
            className="icon"
            src={weatherData.current.condition.icon}
            alt="weather icon"
          />
          <p className="temperature">{weatherData.current.temp_c}°</p>
          <p className="location">{weatherData.location.name}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
