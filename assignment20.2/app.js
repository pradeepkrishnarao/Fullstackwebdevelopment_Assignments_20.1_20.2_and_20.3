var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var path = require('path');
var cookieParser = require('cookie-parser');

//Require the Router that has been defined in fruits.js
var fruits = require('./fruits.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static(path.join(__dirname, 'api')));

//Use the Router on the sub route /fruits
app.use('/fruits', fruits);
console.log("Please carry on CRUD operation on this sub route fruits http://localhost:3000/fruits");

// error handler
app.use(function(err, req, res, next) { 
// set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); 

//app is exported
module.exports = app;
