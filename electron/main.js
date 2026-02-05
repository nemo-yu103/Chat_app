const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let serverProcess;
let reactProcess;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "チーム１　チャットアプリ",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:3000/login");
};

app.whenReady().then(() => {
  serverProcess = spawn("node", [path.join(__dirname, "server.js")], {
    stdio: "inherit",
  });

  if (!app.isPackaged) {
    reactProcess = spawn("npm", ["start"], {
      cwd: path.join(__dirname, ".."),
      stdio: "inherit",
      shell: true,
    });
  }

  createWindow();
});

app.on("window-all-closed", () => {
  if (serverProcess) serverProcess.kill();
  if (reactProcess) reactProcess.kill();
  app.quit();
});
