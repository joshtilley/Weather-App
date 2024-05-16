import "./style.css";
import { WeatherData } from "./weatherDataClass.js";
import { populate } from "./populateWeatherCard.js";

// const button = document.getElementById("test-Btn");
// const location_input = document.getElementById("location");

// button.addEventListener("click", () => testFunction(location_input.value));

async function testFunction(location = "nottingham") {
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

testFunction();
