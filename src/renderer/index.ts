import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import path from 'path';
import { getCurrentPosition } from '../utils/position';
import { OpenWeather } from '../open-weather/index';
import {
  kelvinToFahrenheit,
  millimetersToInches,
  metersPerSecondToMilesPerHour,
} from '../utils/conversions';
import { createChart } from '../charts';
import { ChartPoint } from 'chart.js';
import { Forecast } from '../open-weather/models/forecast/hourly';
import { DateTime } from 'luxon';
import * as ejs from 'ejs';

declare var __static: string;
if (module.hot) {
  module.hot.accept();
}

async function setDisplay(cityName: string, forecast: Forecast) {
  const ejsData: Partial<{
    time: string;
    cityName: string;
    icon: string;
    description: string;
    precipitation: string;
    temperature: string;
    humidity: string;
    wind: string;
  }> = {
    cityName,
    time: DateTime.fromSeconds(forecast.dt).toLocaleString(),
    precipitation: millimetersToInches(
      (forecast.rain?.['3h'] || 0) + (forecast.snow?.['3h'] || 0)
    ).toFixed(2),
    temperature: kelvinToFahrenheit(forecast.main.temp).toFixed(0),
    humidity: forecast.main.humidity.toFixed(0),
    wind: metersPerSecondToMilesPerHour(forecast.wind?.speed || 0).toFixed(0),
  };

  if (forecast.weather?.[0] !== null) {
    ejsData.description = forecast.weather[0].main;
    ejsData.icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
  }

  const rendererdHtml = await ejs.renderFile(
    path.join(__static, './index.ejs'),
    ejsData
  );
  document.getElementById('app').innerHTML = rendererdHtml;
}

async function refreshAndRender() {
  const position = await getCurrentPosition();
  const response = await OpenWeather.forecast(
    position.latitude,
    position.longitude,
    process.env.ELECTRON_WEBPACK_APP_OPEN_WEATHER_API_KEY
  );

  await setDisplay(response.city.name, response.list[0]);

  const temps: ChartPoint[] = response.list.map((l) => ({
    x: DateTime.fromMillis(l.dt).toJSDate(),
    y: kelvinToFahrenheit(l.main.temp),
  }));
  createChart(document.getElementById('tempChart') as HTMLCanvasElement, temps);

  document.getElementById('debug').innerText = JSON.stringify(response);
}

refreshAndRender();
