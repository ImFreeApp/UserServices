var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// connect to mongoDB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/haunt_userservices');

// use middleware and hook up routes
var userRouter = express.Router();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/user', userRouter);

// setup routes require
require('./users/userRoutes')(userRouter);

// listen to server
var server = app.listen(process.env.PORT || 3002, function (){
  console.log('UserServices listening on', server.address().address, server.address().port);
});

module.exports = app;

// leave extra line at end
