// Importing Libraries
import { combineReducers } from 'redux';  
import * as types from './actions/types';  
import {browserHistory} from 'react-router';

// Importing files
const config = require("../config.json");

var initialState = {
    test: null,
    modal: {
        type: "",
        active: false
    },
    items: [],
    session: !!sessionStorage.jwt
};

const testReducer = function(test = initialState.test, action) {  
    switch(action.type) {
        case types.TEST:
            return "This works";
        default: 
            return "Test";
    }
}

const modalReducer = function(modal = initialState.modal, action) {  
    switch(action.type) {
        case types.MODAL:
            return {type: types.MODAL, active: true};    
        case types.ADD_SOURCE:
            return {type: types.ADD_SOURCE, active: true}; 
        case types.EDIT_SOURCE:
            return {type: types.EDIT_SOURCE, active: true};
        case types.CLEAR_MODALS:
            return {type: "", active: false};
        default: 
            return modal;
    }
}


const itemsReducer = function(items = initialState.items, action) {  
    switch(action.type) {
        case types.GET_ITEM:
            return Object.assign(item, action.payload);    
        case types.GET_ITEM:
            return Object.assign(items, action.payload);
        default: 
            return items;
    }
}

const sessionReducer = function(session = initialState.session, action) {  
    var jwt = config.SESSION_ID;
    switch(action.type) {
        case types.AUTH:
            browserHistory.push('/dashboard');
            session = {
                ...session,
                session: action.payload
            }
            return !!sessionStorage.jwt;
        case types.UNAUTH:
            browserHistory.push('/login');
            session = {
                ...session, 
                session: null
            }
            return !!sessionStorage.jwt;
        default: 
            return session;
    }
}

// reducers always works with the payload
// a reducer = a top level state
const rootReducer = combineReducers({ 
    test: testReducer, 
    modal: modalReducer,
    items: itemsReducer,
    session: sessionReducer
});

export default rootReducer;  
