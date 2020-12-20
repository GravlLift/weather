import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';
let window: BrowserWindow;

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 500px
    width: 500,
    // Set the initial height to 400px
    height: 400,
    // set the title bar style
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#FFF',
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
    webPreferences: { nodeIntegration: true },
  });

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      url.format({
        pathname: path.join(__dirname, '../renderer/index.html'),
        protocol: 'file',
        slashes: true,
      })
    );
  }

  window.once('ready-to-show', () => {
    window.show();
    window.maximize();
  });
});
