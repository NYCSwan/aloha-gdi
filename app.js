var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var fs = require('fs');

var messages = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/messages', messages);
// app.use('/users', users);
 app.get('/', function(req, res, next){
 	res.send(messages);
 	
 });
 app.all('/messages', function(req, res, next) {
 	res.send('messages')
 	var message = url.parse(req.url, true).query;

 	messages.push({
 		message: message.message,
 		x: message.x,
 		y: message.y
 	})

 	fs.exists('messages.json', function(exists){
    if(exists){
        console.log("yes file exists");
        fs.readFile('messages.json', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        var json = JSON.stringify(messages); 
        fs.writeFile('messages.json', json); 
        }});
    } else {
        console.log("file not exists")
        var json = JSON.stringify(messages);
        fs.writeFile('messages.json', json);
        }
    });
 });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
