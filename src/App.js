import logo from "./logo.svg";
import "./App.css";
import LocationForm from "./pages/LocationForm";
import { useEffect, useState } from "react";
import GeoAPI from "./components/GeoAPI";
import WeatherTable from "./pages/WeatherTable";

function App() {
  const [page, setPage] = useState("locationForm");
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    var location = JSON.parse(localStorage.getItem("location"));
    if (location) {
      async function weatherAPI() {
        var weatherData = await GeoAPI(location);
        if (weatherData.status >= 200 && weatherData.status < 400) {
          setPage("weatherPage");
          setWeatherData(weatherData.data);
        } else {
          setPage("locationForm");
        }
      }
      weatherAPI();
    }
  }, []);
  return (
    <div className="App">
      {page === "locationForm" ? (
        <LocationForm setPage={setPage} setWeatherData={setWeatherData} />
      ) : (
        <></>
      )}
      {page === "weatherPage" ? (
        <WeatherTable data={weatherData} setPage={setPage} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
