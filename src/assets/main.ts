import { getCurrentPosition } from './utils/position';
import { OpenWeather } from './open-weather/index';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles.css';
import {
  kelvinToFahrenheit,
  millimetersToInches,
  metersPerSecondToMilesPerHour,
} from './utils/conversions';
import * as moment from 'moment';
import { createChart } from './charts';
import { ChartPoint } from 'chart.js';
import { Forecast } from './open-weather/models/forecast/hourly';

function setDisplay(forecast: Forecast) {
  document.getElementById('time').innerText = moment(forecast.dt * 1000).format(
    'dddd h:mm A'
  );

  if (forecast.weather?.[0] !== null) {
    document.getElementById('description').innerText = forecast.weather[0].main;
    const icon = document.createElement('img');
    icon.setAttribute('id', 'icon');
    icon.setAttribute(
      'src',
      `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    );
    document.getElementById('conditions').prepend(icon);
  }

  document.getElementById('temperature').innerText = kelvinToFahrenheit(
    forecast.main.temp
  ).toFixed(0);

  document.getElementById('precipitation').innerText = millimetersToInches(
    (forecast.rain?.['3h'] || 0) + (forecast.snow?.['3h'] || 0)
  ).toFixed(2);
  document.getElementById(
    'humidity'
  ).innerText = forecast.main.humidity.toFixed(0);
  document.getElementById('wind').innerText = metersPerSecondToMilesPerHour(
    forecast.wind?.speed || 0
  ).toFixed(0);
}

Neutralino.init({
  load: async function () {
    const position = await getCurrentPosition();
    const response = await OpenWeather.forecast(
      position.coords.latitude,
      position.coords.longitude,
      process.env.OPEN_WEATHER_API_KEY
    );

    document.getElementById('city-name').innerText = response.city.name;

    setDisplay(response.list[0]);

    const temps: ChartPoint[] = response.list.map((l) => ({
      x: moment(l.dt * 1000),
      y: kelvinToFahrenheit(l.main.temp),
    }));
    const tempChart = createChart(
      document.getElementById('tempChart') as HTMLCanvasElement,
      temps
    );

    document.getElementById('debug').innerText = JSON.stringify(response);
  },
  pingSuccessCallback: function () {},
  pingFailCallback: function () {},
});
