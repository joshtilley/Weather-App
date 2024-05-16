export class WeatherData {
  constructor(input) {
    this.city = input.location.name;
    this.country = input.location.country;
    this.localtime = input.location.localtime;
    this.last_updated = input.current.last_updated;
    this.temp_c = input.current.temp_c;
    this.feelslike_c = input.current.feelslike_c;
    this.humidity = input.current.humidity;
    this.wind_mph = input.current.wind_mph;
    this.status = input.current.condition.text;
    this.icon = input.current.condition.icon;
    this.is_day = input.current.is_day;
    this.cloud = input.current.cloud;
  }
}
