import { WeatherAPI } from "../pages/weather";
describe('Weather API Tests', () => {
  const apiKey = Cypress.env('apiKey');
  const weatherApi = new WeatherAPI(apiKey);
  it('The API should return the current weather data for a city', () => {
    weatherApi.getWeatherByCityName('City of Santiago').then((response) => {
      console.log(JSON.stringify(response))
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('weather');
      expect(response.body).to.have.property('main');
    });
  });
  it('The API should retrieve weather data using a city ID', () => {
    weatherApi.getWeatherByCityId('2172814').then((response) => {
      console.log(JSON.stringify(response))
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('weather');
      expect(response.body).to.have.property('main');
    });
  });
  it('The API should be able to return a 5-day forecast for a specific city', () => {
    weatherApi.getForecastByCityName('Colombia').then((response) => {
      console.log(JSON.stringify(response))
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('list');
      expect(response.body.list.length).to.be.greaterThan(0);
      expect(response.body.list).to.have.length(40);
    })
  })
  it('Should validate the structure of the weather response for a city', () => {
    weatherApi.getWeatherByCityName('Malvinas').then((response) => {
      console.log(JSON.stringify(response))
      expect(response.status).to.eq(200);
      expect(response.body).to.have.all.keys(
        'coord', 'weather', 'base', 'main', 'visibility', 'wind', 'clouds', 'dt', 'sys', 'timezone', 'id', 'name', 'cod'
      );
      expect(response.body.name).to.be.a('string');
    });
  });
  it('Should handle 401 Unauthorized for invalid API key', () => {
    const baseUrl = weatherApi.baseUrl
    cy.request({
      method: 'GET',
      url: `${baseUrl}/weather?q=Paris&appid=invalid_key`,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(JSON.stringify(response))
      expect(response.status).to.eq(401);
    });
  });
  it('Should have a response time less than 500ms', () => {
    const startTime = new Date().getTime();
    weatherApi.getWeatherByCityName('Polonia').then(() => {
      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).to.be.lessThan(500);
    });
  });
})