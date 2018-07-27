var express = require('Express');
var app = express();

var sample = require('./sample.js');

app.use('/sample', sample);

app.listen(3000);
console.log("http://localhost:3000/sample ..started");