# News Feed #

NewsFeed is a application that uses rss feeds to display articles with a user friendly interface. This app uses MongoDB, Express.js, React and Node.js

## Prerequisites ###

* A machine to host the application
* The latest version of Node.js installed
* An instance of MongoDB

## Installation and Usage
Please run ```npm install``` to install all the necessary dependencies needed to run the application. Please take note of the following commands:
* ```npm run dev``` - start an instance of the app running on http://localhost:3000.
* ```npm run build``` - webpack bundles the client side files together.
* ```npm start``` - starts the server application where client and api routes are served from.

## Testing
All tests are found in the ```test``` folder and uses a combination of Jest and Enzyme to test components within the app. Please run the following to run all the tests currently available:
```
npm run test
``` 
Alternativly, please run the following to run the tests as well as watching for changes to them:
```
npm run test:watch
``` 

## Contributing
Contributions are welcome.

## Support
Please refer the [issue tracker](https://github.com/kap16/newsFeed/issues) for reporting problems and requesting new features.

## License
This software is available under the MIT licnce