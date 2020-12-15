import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

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
    // set the background color to black
    backgroundColor: '#FFF',
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
  });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  window.once('ready-to-show', () => {
    window.show();
  });
});