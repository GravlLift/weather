import {
  OneCallResponse,
  CurrentConditionsResponse,
  HourlyResponse,
} from './models/index';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export module OpenWeather {
  export async function currentConditions(
    lat: number,
    lon: number,
    key: string
  ): Promise<CurrentConditionsResponse> {
    const res = await client.get<CurrentConditionsResponse>(
      `/weather?lat=${lat}&lon=${lon}&appid=${key}`
    );
    return res.data;
  }

  export async function forecast(
    lat: number,
    lon: number,
    key: string
  ): Promise<HourlyResponse> {
    const res = await client.get<HourlyResponse>(
      `/forecast?lat=${lat}&lon=${lon}&appid=${key}`
    );
    return res.data;
  }

  export async function oneCall(
    lat: number,
    lon: number,
    key: string
  ): Promise<OneCallResponse> {
    const res = await client.get<OneCallResponse>(
      `/onecall?lat=${lat}&lon=${lon}&appid=${key}`
    );
    return res.data;
  }
}
