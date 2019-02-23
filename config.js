
const config = {};

if (process.env.NODE_ENV === 'production') {
  // use development config as a basis for this
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
  };
}

module.exports = config;