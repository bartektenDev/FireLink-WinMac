// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

//local Server
const { fork } = require('child_process')
const ps = fork(`${__dirname}/server.js`)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.mainWindow = new BrowserWindow({width: 800, height: 600,icon: __dirname + '/Bluetooth.ico'});

  mainWindow = new BrowserWindow({width: 300, height: 530, icon:__dirname + '/web_hi_res_512.png'})

  var session = mainWindow.webContents.session;
   session.clearStorageData(function() {
       session.clearCache(function() {
       });
   });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:5000/electron/index.html');

  //refresh to be safe
  mainWindow.reload();

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-fail-load', (event, url) => {
    console.log('Attempting to load setup again...');
    mainWindow.loadURL('http://localhost:5000/electron/index.html');
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
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
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
