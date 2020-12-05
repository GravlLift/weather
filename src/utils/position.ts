import { DateTime } from 'luxon';

export function getCurrentPosition(): Promise<Position> {
  return Promise.resolve({
    coords: {
      latitude: 42.336491,
      longitude: -71.050842,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: null,
  });
  // return new Promise<Position>((resolve, reject) => {
  //   navigator.geolocation.getCurrentPosition(resolve, reject);
  // });
}
