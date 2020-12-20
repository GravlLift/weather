export function getCurrentPosition(): Promise<Partial<Coordinates>> {
  // Location detection requires a Google API Key, maybe later
  return Promise.resolve({
    latitude: Number.parseFloat(process.env.ELECTRON_WEBPACK_APP_LATITUDE),
    longitude: Number.parseFloat(process.env.ELECTRON_WEBPACK_APP_LONGITUDE),
  });
}
