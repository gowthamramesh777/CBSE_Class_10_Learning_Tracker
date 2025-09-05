const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    },
    show: false
  });

  // Load the local index.html from the app folder
  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Show when ready (avoids white flash)
  win.once('ready-to-show', () => {
    win.show();
  });

  // Optional: open devtools during development
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools({ mode: 'right' });
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
