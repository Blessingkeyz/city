import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

interface WeatherData {
  temperature: string;
  shortForecast: string;
  detailedForecast: string;
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const losAngel = {
    latitude: 34.052235,
    longitude: -118.243683,
  };

  const apiEndpoint = "https://api.weather.gov/points";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiEndpoint}/${losAngel.latitude},${losAngel.longitude}`)
      .then((response) => {
        const forecastUrl = response.data.properties.forecast;
        return axios.get(forecastUrl);
      })
      .then((forecastResponse) => {
        const currentWeather = forecastResponse.data.properties.periods[0];
        setWeather({
          temperature: `${currentWeather.temperature}°${currentWeather.temperatureUnit}`,
          shortForecast: currentWeather.shortForecast,
          detailedForecast: currentWeather.detailedForecast,
        });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  return (
    <div className="App">
      <div>
        <h1>Los Angeles</h1>
      </div>
      {weather ? (
        <div className="weatherContainer">
          <h3>Temperature: {weather.temperature}</h3>
          <p>Short Details: {weather.shortForecast}</p>
          <p>Full Details: {weather.detailedForecast}</p>
        </div>
      ) : (
        <p>Designed by Blessingkeyz</p>
      )}
    </div>
  );
}

export default App;
