// Importing Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Importing files
import style from 'styles/default/index.css';
import feedstyle from 'styles/default/feeds.css';
import rootReducer from './reducers/root';
import Home from 'pages/home';
import Login from 'pages/login';
import Register from 'pages/register';
import ErrorPage from 'pages/error';
import Sources from 'pages/sources';
import Settings from 'pages/settings';
import NewsItem from 'pages/newsItem';
const config = require('../config');

// create redux store
const store = createStore(rootReducer, applyMiddleware(thunk));
if (process.env.NODE_ENV === 'development') {
  store.subscribe(() => {
    console.log("store updated", store.getState());
  })
}

// user auth
function requireAuth(nextState, replace) {
  if (!sessionStorage.getItem(config.sessionId)) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

// redirects to home if user is already signed in
function redirectToHome(nextState, replace) {
  if (sessionStorage.getItem(config.sessionId)) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Home} onEnter={requireAuth} />
          <Route path="/login" component={Login} onEnter={redirectToHome} />
          <Route path="/register" component={Register} onEnter={redirectToHome} />
          <Route path="/sources" component={Sources} onEnter={requireAuth} />
          <Route path="/settings" component={Settings} onEnter={requireAuth} />
          <Route path="/atricle/:id" component={NewsItem} onEnter={requireAuth}/>
          <Route path='*' component={ErrorPage} />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));