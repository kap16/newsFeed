// Importing Libraries
import { combineReducers } from 'redux';  

// reducers always works with the payload
// a reducer = a top level state
const rootReducer = combineReducers({ 
    test: require('./test'), 
    modal: require('./modal'),
    items: require('./items'),
    sources: require('./sources'),
    settings: require('./settings'),
    session: require('./session')
});

export default rootReducer;  
