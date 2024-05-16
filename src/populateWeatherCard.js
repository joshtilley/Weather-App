const Conversions = {
  Fahr: `&deg;F`,
  Cent: `&deg;C`,
  mph: ` mph`,
  kmph: ` kmph`,
};

export function populate(weatherData) {
  // update location
  const city_div = document.getElementById("city");
  city_div.innerText = weatherData.city;

  const country_div = document.getElementById("country");
  country_div.innerText = weatherData.country;

  const icon_div = document.getElementById("icon");
  if (document.getElementById("weather-icon")) {
    let prevIcon = document.getElementById("weather-icon");
    prevIcon.remove();
  }
  const icon_png = document.createElement("img");
  icon_png.src = weatherData.icon;
  icon_png.alt = weatherData.status;
  icon_png.id = "weather-icon";
  icon_div.append(icon_png);

  const status_div = document.getElementById("status");
  status_div.innerText = weatherData.status;

  const localtime_div = document.getElementById("localtime");
  localtime_div.innerText = weatherData.localtime.slice(11, 16);

  const lastUpdated_div = document.getElementById("last-updated");
  lastUpdated_div.innerText = weatherData.last_updated.slice(11, 16);

  const temp_div = document.getElementById("temp");
  temp_div.innerText = weatherData.temp_c;
  const tempUnits = document.createElement("span");
  temp_div.append(tempUnits);
  tempUnits.innerHTML = Conversions["Cent"];

  const feelsLike_div = document.getElementById("feels-like");
  feelsLike_div.innerText = weatherData.feelslike_c;
  const feelsLikeUnits = document.createElement("span");
  feelsLike_div.append(feelsLikeUnits);
  feelsLikeUnits.innerHTML = Conversions["Cent"];

  const humidity_div = document.getElementById("humidity");
  humidity_div.innerText = `${weatherData.humidity}%`;

  const windSpeed_div = document.getElementById("wind");
  windSpeed_div.innerText = weatherData.wind_mph;
  const windUnits = document.createElement("span");
  windUnits.classList.add("units");
  windSpeed_div.append(windUnits);

  windUnits.innerHTML = Conversions["mph"];

  // colours card borders based on weather conditions
  const weatherColouring = colourCardBorder(weatherData);

  const card_div = document.querySelector(".card-main");
  card_div.style.setProperty("border-image", weatherColouring.mainGradient);

  const optionsCard_div = document.querySelector(".options-card");
  optionsCard_div.style.setProperty(
    "border-color",
    Colours.cloud[weatherColouring.cloudCoverage]
  );

  const headerCard_div = document.querySelector(".title-card");
  headerCard_div.style.setProperty(
    "border-color",
    Colours.cloud[weatherColouring.cloudCoverage]
  );

  const cardDivider_div = document.querySelector(".divider");
  cardDivider_div.style.setProperty(
    "background-color",
    Colours.is_day[weatherColouring.nightOrDay]
  );
}

const Colours = {
  /* condition colouring */
  cloud: {
    0: `hsl(192, 100%, 65%)`,
    1: `hsl(192, 59%, 73%)`,
    2: `hsl(193, 17%, 53%)`,
  },
  /* night or day colouring */
  is_day: {
    0: `hsl(258, 56%, 25%)`,
    1: `hsl(50, 100%, 79%)`,
    2: `hsl(50, 100%, 50%)`,
  },
};

function colourCardBorder(weatherData) {
  let nightOrDay = weatherData.is_day;
  let cloudCoverage = 60;
  if (weatherData.cloud <= 25) {
    cloudCoverage = 0;
  } else if (weatherData.cloud <= 65) {
    cloudCoverage = 1;
  } else {
    cloudCoverage = 2;
  }
  if (cloudCoverage === 0 && nightOrDay === 1) nightOrDay = 2;
  let gradient = `linear-gradient(
    to top,
    ${Colours.cloud[cloudCoverage]} 60%,
    ${Colours.is_day[nightOrDay]}
  ) 1`;
  return { mainGradient: gradient, cloudCoverage, nightOrDay };
}
