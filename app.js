const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require("./config");
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const util = require('./server/util');

// handle connection to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI,config.mongoOpts);
mongoose.connection.on('connected', function () {  
    util.logSuccess('Mongoose default connection open to ' + config.mongoURI);
}); 

mongoose.connection.on('error',function (err) {  
    app.get('/404',function(req, res) {
        res.send('Database connection error')
    })
    util.logError('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
    util.logWarning('Mongoose default connection disconnected'); 
});

// setting up express
const app = express();
app.options('*', cors())
util.log('CORS-enabled web server');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./server/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// setting headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers',"Content-Type, authorization");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// API routes
app.use(config.server.routePrefix, require('./server/routes/user'));
app.use(config.server.routePrefix, require('./server/routes/source'));
app.use(config.server.routePrefix, require('./server/routes/item'));


if(process.env.API_ONLY === 'true'){
    // If Application only needs the API
    util.log('\"API Only\" Mode...');
}
else{
    // for Web client as well as api
    if(process.env.NODE_ENV === 'development'){
        util.log('Development Mode...');
    }else{
        app.use(express.static(__dirname + '/build'));
        app.get('*', function(req, res) {
            res.sendFile(path.resolve(__dirname)+'/build/index.html');
        });  
    }
}

// port listening
app.set('port', (process.env.port || config.server.port));

// error handling middleware
app.use(function(err,req,res,next){
    res.status(422).send({error: err.message})
});

// confirm that express application is running
app.listen(app.get('port'), function(){
    util.logSuccess('now listening for requests on port '+app.get('port')+'...'); 
});