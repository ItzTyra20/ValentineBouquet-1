const path = require("path");
const { app, BrowserWindow, ipcMain, desktopCapturer, dialog } = require("electron");
const fs = require("fs");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 1000,
    resizable: false,
    zoomFactor: 1.0,             // <--- ADD THIS LINE
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
  },
});
  win.removeMenu();

 // Add this to check the path
  const indexPath = path.join(__dirname, "public", "index.html");
  console.log("Loading HTML from:", indexPath);  // <-- This prints the path
  
  win.loadFile(indexPath);

  win.once("ready-to-show", () => {
    console.log("Window ready-to-show, now displaying");
    win.show();
  });

  win.webContents.openDevTools();
}

  // IPC listeners outside createWindow
ipcMain.on("load-page", (event, page) => {
  if (win) win.loadFile(path.join(__dirname, "public", page));
}); 

 ipcMain.on("capture-screenshot", async () => {
  try {
    const screenshotPath = await captureScreenshot();
    win.webContents.send('screenshot-saved', screenshotPath);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  }
});

function captureScreenshot() {
  return new Promise((resolve, reject) => {
    if (!win) return reject("No window to capture");
    win.capturePage().then(image => {
      const filePath = path.join(app.getPath('downloads'), 'screenshot.png');
      fs.writeFileSync(filePath, image.toPNG());
      resolve(filePath);
    }).catch(err => reject(err));
  });
}

// App ready
app.whenReady().then(() => {
  console.log("creating window…");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});