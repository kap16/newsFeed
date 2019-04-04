// Importing Libraries
import { combineReducers } from 'redux';
import modalReducer from './modal';
import itemsReducer from './items';
import sourcesReducer from './sources';
import settingsReducer from './settings';
import sessionReducer from './session';

// reducers always works with the payload
// a reducer = a top level state
const rootReducer = combineReducers({
  modal: modalReducer,
  items: itemsReducer,
  sources: sourcesReducer,
  settings: settingsReducer,
  session: sessionReducer
});

export default rootReducer;  
