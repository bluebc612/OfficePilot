// var express = require('express');
// var connect = require('connect');
// var http = require('http');
// var app = express();

// var allowCrossDomain = function(req, res, next) {
//   // Added other domains you want the server to give access to
//   // WARNING - Be careful with what origins you give access to
//   var allowedHost = [
//     'http://localhost'
//   ];
  
//   // if(allowedHost.indexOf(req.headers.origin) !== -1) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', req.headers.origin)
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
//     next();
//   // } else {
//   //   res.send({auth: false});
//   // }
// }

// app.configure(function() {
//     app.use(express.cookieParser());
//     app.use(express.bodyParser());
//     app.use(allowCrossDomain);
//     app.use(express.static('app'));
//     app.use('/js/lib/', express.static('node_modules/requirejs/'));
//     app.use('/node_modules', express.static('node_modules'));
//     app.use('/test', express.static('test/'));
//     app.use('/test', express.static('app'));
// });

// http.createServer(app).listen(8080, function() {
//   console.log('Running on http://localhost:8080');
// });

var connect = require('connect')
  , http = require('http')
  , app
  ;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');

    next();
}

app = connect()
  .use(connect.static('app'))
  .use('/js/lib/', connect.static('node_modules/requirejs/'))
  .use('/node_modules', connect.static('node_modules'))
  .use('/test', connect.static('test/'))
  .use('/test', connect.static('app'))
  .use(allowCrossDomain)
  ;

http.createServer(app).listen(8080, function() {
  console.log('Running on http://localhost:8080');
});

