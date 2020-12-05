export function getCurrentPosition(): Promise<Position> {
  return new Promise<Position>((resolve) => {
    navigator.geolocation.getCurrentPosition((gp) => {
      resolve(gp);
    });
  });
}
