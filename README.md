# Weather

A simple cross-operating system application for displaying current and upcoming weather conditions. Powered by Open Weather API.

## Geting started

### Install dependencies

```
npm i
```

### Environment configuration

Create a .env file in the repository root with your open weather api key, as well as gps location coordinates

```
ELECTRON_WEBPACK_APP_OPEN_WEATHER_API_KEY=examplekey
ELECTRON_WEBPACK_APP_LATITUDE=43.1
ELECTRON_WEBPACK_APP_LONGITUDE=-65.21
```

### Build

Run webpack build (or vs code task `npm: build`)

```
npm run build
```

### Run

Execute electron with built TS (or vs launch `Debug Main Process`)

```
npx electron ./dist/main/main.js
```
