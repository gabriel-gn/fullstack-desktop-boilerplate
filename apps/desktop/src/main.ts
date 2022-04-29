import {app, nativeImage, BrowserWindow} from "electron";
import {ChildProcess, fork} from 'child_process';
import * as path from "path";

let childProcesses: ChildProcess[] = [];

function createWindow() {
    const appIcon = nativeImage.createFromPath(path.join(__dirname, "assets/icon.png"));

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        show: false,
        // icon: appIcon,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            devTools: !app.isPackaged
        },
    });
    app.dock.setIcon(appIcon);

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "app/index.html"));

    // Open the DevTools.
    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }

    /**
     * UTILIZAR FORK AO INVÉS DE SPAWN()!!!
     * REF: https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
     */
    if (childProcesses.length === 0) {
        let apiProccess = fork(path.join(__dirname, "api/src/main.js"));
        childProcesses.push(apiProccess);
    }

    mainWindow.maximize();
    mainWindow.show();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    // if (process.platform !== "darwin") {
    childProcesses.forEach(proc => {
        proc.kill();
    });
    app.quit();
    // }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
