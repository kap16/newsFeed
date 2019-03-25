const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const config = require("./config");
const util = require('./server/util');

// handle connection to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, config.mongoOpts);
mongoose.connection.on('connected', function () {
  util.logSuccess('Mongoose default connection open to ' + config.mongoURI);
});

mongoose.connection.on('error', function (err) {
  app.get('/404', function (req, res) {
    res.send('Database fconnection error')
  })
  util.logError('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  util.logWarning('Mongoose default connection disconnected');
});

if (process.env.NODE_ENV === 'production') {
  // static files for production
  app.use(express.static(path.join(__dirname, 'build')));
  util.log('Production Mode...');
}

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
  util.log('Development Mode...');
}

require('./server/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use(config.server.routePrefix, require('./server/routes/user'));
app.use(config.server.routePrefix, require('./server/routes/source'));
app.use(config.server.routePrefix, require('./server/routes/item'));

// the code below is needed to prevent route conflicts
if (process.env.NODE_ENV === 'production') {
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname)+'/build/index.html');
  });
} 

// confirm that express application is running and using the right port
app.set('port', (process.env.port || config.server.port));
app.listen(app.get('port'), function () {
  util.logSuccess('now listening for requests on port ' + app.get('port') + '...');
});

// error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message })
});
