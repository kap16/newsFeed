# News Feed #

An rss feed application.

### Prerequisites ###

* The latest version of NodeJS installed
* An instance of MongoDB

### Installation and Usage
* ```npm install``` 

### Contributing
Contributions are welcome.

#### Running tests
* ```npm run dev``` will start an instance of the app using webpack-dev-server running on port 3001. Please use this command for debuging against UI and Graphical changes in the web client.
* ```npm run debug``` will start an instance of the app, building the app using webpack and then serving it using express running on port 3001. Please use this command for debuging against changes to the express application (found in the ```server``` folder) and server requests.

### Support
Please refer the [issue tracker](https://github.com/kap16/newsFeed/issues) for reporting problems and requesting new features.

### License
This software is available under the MIT licnce