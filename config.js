require('dotenv').config()
const config = {};

if (process.env.NODE_ENV === 'production') {
  config.sessionId = process.env.SESSION_ID;
  config.secret = process.env.SECRET;

  config.server = {};
  config.server.port =  process.env.SERVER_PORT;
  config.server.routePrefix = "/api";
  config.server.url = process.env.SERVER_URI + config.server.routePrefix;
  
  config.mongoURI = process.env.MONGO_URI
  config.mongoOpts = {
    autoIndex: false,
    reconnectTries: 30,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  };
} else {
  config.sessionId = "sessionID";
  config.secret = "someSecret";
  config.host = "localhost";

  config.server = {};
  config.server.port = 3001;
  config.server.routePrefix = "/api";
  config.server.url = "http://localhost:"+config.server.port+config.server.routePrefix;

  config.mongoURI = "mongodb://localhost/news-feed-db";
  config.mongoOpts = {
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  };
}

module.exports = config;