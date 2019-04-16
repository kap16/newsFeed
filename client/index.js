// Importing Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';

// Importing files
import style from 'styles/default/index.scss';
import rootReducer from './reducers/root';
import ConnectedHome from 'pages/home';
import ConnectedLogin from 'pages/login';
import ConnectedRegister from 'pages/register';
import ConnectedErrorPage from 'pages/error';
import ConnectedSources from 'pages/sources';
import ConnectedSettings from 'pages/settings';
import ConnectedArticlePage from 'pages/articlePage';
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
          <Route path="/" component={ConnectedHome} onEnter={requireAuth} />
          <Route path="/login" component={ConnectedLogin} onEnter={redirectToHome} />
          <Route path="/register" component={ConnectedRegister} onEnter={redirectToHome} />
          <Route path="/sources" component={ConnectedSources} onEnter={requireAuth} />
          <Route path="/settings" component={ConnectedSettings} onEnter={requireAuth} />
          <Route path="/atricle/:id" component={ConnectedArticlePage} onEnter={requireAuth} />
          <Route path='*' component={ConnectedErrorPage} />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));