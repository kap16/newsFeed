// Importing Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
const fetch = require("node-fetch");

// Importing files
import style from 'css/default/index.css';
import rootReducer from './reducers';
import Home from 'pages/home';
import Login from 'pages/login';
import Register from 'pages/register';
import ErrorPage from 'pages/error';
import Sources from 'pages/sources';
import Settings from 'pages/settings';
const config = require('../config.json');

// create redux store
const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {
    console.log("store updated", store.getState());
})

// user auth
function requireAuth(nextState, replace) {
    if (!sessionStorage.getItem(config.SESSION_ID)) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

// checks if user exists
function userCheck() {
    var url = config.api+"/users";
    fetch(url,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then(function(output){
        if(output.users.length === 0){
            // creates user
            data = {};
            this.props.actions.signUp(data)  
        }else if(output.users.length === 0) {
            browserHistory.listen(function(event) {
                browserHistory.push(event.pathname);
            });
        }
    })
    .catch(function(e){ console.log(e);});    
}

class App extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Home} onEnter={requireAuth}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} onEnter={userCheck}/>
                    <Route path="/sources" component={Sources} onEnter={requireAuth}/>
                    <Route path="/settings" component={Settings} onEnter={requireAuth}/>
                    <Route path='*' component={ErrorPage} />
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));