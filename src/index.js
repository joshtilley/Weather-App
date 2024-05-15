import "./style.css";

const button = document.getElementById("test-Btn");
const location_input = document.getElementById("location");

button.addEventListener("click", () => testFunction(location_input.value));

async function testFunction(location) {
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
      let weatherData = new WeatherData(unparsedData);
      console.log(weatherData);
    });
}

class WeatherData {
  constructor(input) {
    this.city = input.location.name;
    this.country = input.location.country;
    this.localtime = input.location.localtime;
    this.last_updated = input.current.last_updated;
    this.temp_c = input.current.temp_c;
    this.feelslike_c = input.current.feelslike_c;
    this.temp_f = input.current.temp_f;
    this.feelslike_f = input.current.feelslike_f;
    this.status = input.current.condition.text;
    this.icon = input.current.condition.icon;
  }
}

/* 
location:
    name
    country
    localtime
current:
    last_updated
    temp_c
    feelslike_c
    temp_f
    feelslike_f
    condition:
        text
        icon
*/
