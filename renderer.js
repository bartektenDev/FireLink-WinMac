// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { fork } = require('child_process')
const ps = fork(`${__dirname}/server.js`)
