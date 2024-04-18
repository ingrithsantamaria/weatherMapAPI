export class WeatherAPI {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }
    getWeatherByCityName(cityName) {
      return cy.request({
        method: 'GET',
        url: `${this.baseUrl}/weather?q=${cityName}&appid=${this.apiKey}`,
      });
    }
    getWeatherByCityId(cityId) {
      return cy.request({
        method: 'GET',
        url: `${this.baseUrl}/weather?id=${cityId}&appid=${this.apiKey}`,
      });
    }
    getForecastByCityName(cityName) {
      return cy.request({
        method: 'GET',
        url: `${this.baseUrl}/forecast?q=${cityName}&appid=${this.apiKey}`,
      });
    }
  }