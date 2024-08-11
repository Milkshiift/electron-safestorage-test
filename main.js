import { app, BrowserWindow, ipcMain, safeStorage } from 'electron'
import * as path from "node:path";

app.setPath('userData', path.resolve('./data'));
(async () => {
    await app.whenReady()
    createWindow()
})();

async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            // Absolute path
            preload: path.resolve(import.meta.dirname, 'preload.cjs'),
            sandbox: false
        }
    })

    await mainWindow.loadFile('main.html');
}

ipcMain.on('encrypt', (event, arg) => {
    event.returnValue = safeStorage.encryptString(arg).toString("base64");
})
ipcMain.on('decrypt', (event, arg) => {
    event.returnValue = safeStorage.decryptString(Buffer.from(arg, "base64"));
})
