var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use('/api/', require('./src/controllers'));

var port = process.env.PORT || 3002;
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/geo';

mongoose.connect(mongoURI);

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});