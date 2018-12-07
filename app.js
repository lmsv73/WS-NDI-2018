var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var logbook = require('./routes/logbook');
var cardiacSystem = require('./routes/cardiacSystem');
// var mongoose = require('mongoose');
var cors = require('cors');

var Capteur = require('./services/capteur/capteur');

var url = 'mongodb://localhost:27017';

var app = express();

var capteur = new Capteur(url);

var meteoRoute = require('./routes/meteo');

var sport = false;

setInterval(() => {
  sport = !sport;
}, 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/meteo', meteoRoute);
app.use('/logbook', logbook);
app.use('/cardiac', function(req, res, next){
  res.locals.sport = sport;
  next();
});
app.use('/cardiac', cardiacSystem);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(req, res, next) {
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT);

module.exports = app;
