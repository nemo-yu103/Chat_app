const { app, BrowserWindow } = require("electron");
const path = require("path");

// ここにexpressjsのコードを入れて

// electron
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    
    win.loadURL("http://localhost:3000/login");
    
    // build version:
    // win.loadFile(path.join(__dirname, "../build/index.html"));
}

app.whenReady().then(createWindow);