
const config = {};

config.sessionId="sessionID";
config.secret="someSecret";
config.host="localhost";

config.client = {};
config.client.port=3001;
config.client.url="http://"+config.host+":"+config.client.port;

config.server = {};
if(process.env.NODE_ENV==='development'){
    config.server.port=3002;
}else{
    config.server.port=config.client.port;
}
config.server.routePrefix="/api";
config.server.url="http://"+config.host+":"+config.server.port+config.server.routePrefix;

config.mongoURI="mongodb://localhost/news-feed-db";
config.mongoOpts = {
    //port:null,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};

module.exports = config;