import { app, BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';

let win: (Electron.BrowserWindow | null) = null;


function createWindow(): void {
  // Start Browser Window
  win = new BrowserWindow({
    height: 800,
    width: 800,
    // frame: false
  });
  win.loadURL(url.format({
    pathname: path.resolve('./build', 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  // open dev tools...
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  win === null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});