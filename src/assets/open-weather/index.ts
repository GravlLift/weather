import {
  OneCallResponse,
  CurrentConditionsResponse,
  HourlyResponse,
} from './models/index';

const apiBase = 'https://api.openweathermap.org/data/2.5';

export module OpenWeather {
  export async function currentConditions(
    lat: number,
    lon: number,
    key: string
  ): Promise<CurrentConditionsResponse> {
    const res = await fetch(
      `${apiBase}/weather?lat=${lat}&lon=${lon}&appid=${key}`
    );
    return res.json();
  }

  export async function forecast(
    lat: number,
    lon: number,
    key: string
  ): Promise<HourlyResponse> {
    const res = await fetch(
      `${apiBase}/forecast?lat=${lat}&lon=${lon}&appid=${key}`
    );
    return res.json();
  }

  export async function oneCall(
    lat: number,
    lon: number,
    key: string
  ): Promise<OneCallResponse> {
    const res = await fetch(
      `${apiBase}/onecall?lat=${lat}&lon=${lon}&appid=${key}`
    );
    return res.json();
  }
}
