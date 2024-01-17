import React from "react";
import "./weatherTable.css";
const WeatherTable = ({ data, setPage }) => {
  if (!data) {
    return null;
  }

  const { location, current } = data;

  return (
    <>
      <button
        className="nextPageButton"
        onClick={() => setPage("locationForm")}
      >
        Fill Input again
      </button>
      <table>
        <tbody>
          <tr>
            <td>Location Name:</td>
            <td>{location.name}</td>
          </tr>
          <tr>
            <td>Region:</td>
            <td>{location.region}</td>
          </tr>
          <tr>
            <td>Country:</td>
            <td>{location.country}</td>
          </tr>
          <tr>
            <td>Temperature (Celsius):</td>
            <td>{current.temp_c} °C</td>
          </tr>
          <tr>
            <td>Temperature (Fahrenheit):</td>
            <td>{current.temp_f} °F</td>
          </tr>
          <tr>
            <td>Humidity:</td>
            <td>{current.humidity}%</td>
          </tr>
          <tr>
            <td>Wind Speed:</td>
            <td>{current.wind_kph} km/h</td>
          </tr>
          <tr>
            <td>Feels Like (Celsius):</td>
            <td>
              {current.feelslike_c} °C{" "}
              <img
                src={current.condition.icon}
                alt="weatherImage"
                className="weatherImage"
              />
            </td>
          </tr>
          <tr>
            <td>Feels Like (Fahrenheit):</td>
            <td>{current.feelslike_f} °F</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default WeatherTable;
