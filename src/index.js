import "./style.css";
import { WeatherData } from "./weatherDataClass.js";
import { populate } from "./populateWeatherCard.js";

const submit_btn = document.getElementById("submit");
const location_input = document.getElementById("location");

location_input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") showWeather(location_input.value);
  location_input.value = "";
});

submit_btn.addEventListener("click", () => {
  showWeather(location_input.value);
  location_input.value = "";
});

async function showWeather(location) {
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=%20f139c21fd2c144ab8e1194255241505&q=" +
      `${location}`,
    {
      mode: "cors",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const unparsedData = response;
      console.log(response);
      let weatherData = new WeatherData(unparsedData);
      console.log(weatherData);
      populate(weatherData);
    });
}

showWeather("nottingham");
