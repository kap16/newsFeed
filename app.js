const express = require('express');
const path = require('path');
const port = process.env.PORT || 3001;
const chalk = require('chalk');
const bodyParser = require('body-parser');
const config = require("./config.json");
const mongoose = require('mongoose');
const cors = require('cors')

// setting up express
const app = express();
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname)+'/build/index.html');
});

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo);
mongoose.connection.on('connected', function () {  
    console.log(chalk.yellow('Mongoose default connection open to ' + config.mongo));
}); 

mongoose.connection.on('error',function (err) {  
    app.get('/404',function(req, res) {
        res.send('Database connection error')
    })
    console.log(chalk.yellow('Mongoose default connection error: ' + err));
}); 

mongoose.connection.on('disconnected', function () {  
    console.log(chalk.yellow('Mongoose default connection disconnected')); 
});

// port listening
app.set('port', (process.env.port || 3001));
if(process.env.NODE_ENV !== 'development'){
    app.options('*', cors())
    console.log('CORS-enabled web server');
}

// setting headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', config.client);
    res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers',"Content-Type, authorization");
    res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// routes
app.use('/api', require('./server/routes'));

// error handling middleware
app.use(function(err,req,res,next){
    res.status(422).send({error: err.message})
});

// confirm that express application is running
app.listen(app.get('port'), function(){
    console.log(chalk.blue('now listening for requests on port '+app.get('port')+'...')); 
});