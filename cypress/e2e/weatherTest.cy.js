import { WeatherAPI } from "../pages/weather";
describe('Weather API Tests', () => {
  const apiKey = Cypress.env('apiKey');
  const weatherApi = new WeatherAPI(apiKey);
  it('Ensure the API returns the current weather data for a city', () => {
    weatherApi.getWeatherByCityName('City of Santiago').then((response) => {
      console.log(JSON.stringify(response))
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('weather');
      expect(response.body).to.have.property('main');
    });
  });
  it('Confirm the API retrieves weather data using a city ID', () => {
    weatherApi.getWeatherByCityId('2172814').then((response) => {
      console.log(JSON.stringify(response))
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('weather');
      expect(response.body).to.have.property('main');
    });
  });
  it('Test the APIs ability to return a 5-day forecast for a specified city', () => {
    weatherApi.getForecastByCityName('Colombia').then((response) => {
      console.log(JSON.stringify(response))
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('list');
      expect(response.body.list.length).to.be.greaterThan(0);
      expect(response.body.list).to.have.length(40);
    })
  })
})