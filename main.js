// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');

//electron squirrel for release
// Module to control application life. (this variable should already exist)
const app2 = electron.app

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app2)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

//local Server
const { fork } = require('child_process')
const ps = fork(`${__dirname}/server.js`)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.mainWindow = new BrowserWindow({width: 800, height: 600,icon: __dirname + '/Bluetooth.ico'});

  mainWindow = new BrowserWindow({width: 420, height: 530, icon:__dirname + '/web_hi_res_512.png'})

  var session = mainWindow.webContents.session;
   session.clearStorageData(function() {
       session.clearCache(function() {
       });
   });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:5000/public/electron/index.html');

  //refresh to be safe
  mainWindow.reload();

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-fail-load', (event, url) => {
    console.log('Attempting to load setup again...');
    mainWindow.loadURL('http://localhost:5000/public/electron/index.html');
  })

  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};
