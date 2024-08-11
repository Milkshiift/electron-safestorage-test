const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        encrypt: (string) => ipcRenderer.sendSync('encrypt', string),
        decrypt: (string) => ipcRenderer.sendSync('decrypt', string)
    }
)
