
const config = {};

config.port=3001;
config.base="http://localhost:"+config.port;
config.api=config.base+"/api";
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
config.sessionId="sessionID";
config.secret="someSecret";

module.exports = config