/**
 * Created by Mihail on 9/14/2016.
 */
var express = require('express');
//var path = require('path');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./bingo-api/models/db');
require('./bingo-api/config/passport');

var routesApi = require('./bingo-api/routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use('/bingo-api', routesApi);

app.use(function(req, res) {
	res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({"message" : err.name + ": " + err.message});
	}
});