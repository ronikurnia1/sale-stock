// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongodbUri = 'mongodb://online-store-user:katakunci@ds011863.mlab.com:11863/online-store';
mongoose.connect(mongodbUri);

// get an instance of the express Router
var router = express.Router();

router.use(function (req, res, next) {
  //console.log(req.method + ' ..' + req.originalUrl);
  //console.log('body', req.body);
  next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function (req, res) {
  res.json({ message: 'Welcome to our api!' });
});

// register routers
app.use(router);

// register router from outside
app.registerRouter = function (route, router) {
  app.use(route, router);
}

module.exports = app;

