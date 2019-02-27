var static = require('node-static');
var file = new static.Server(`${__dirname}/public`)

var urlExists = require('url-exists');

var running = "unknown";


//very important (like all other code)
//this checks if the server is already running to not break lol
urlExists('http://localhost:5000/setup/', function(err, exists) {
  if(exists == false){
    console.log('Starting FireLink Server on  http://localhost:5000/setup/...');
    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            file.serve(request, response)
        }).resume()
    }).listen(5000)
  }else if(exists == true){
    console.log('Please close this window and open the running FireLink window! '+
  'The server is already running!');
  }
});
