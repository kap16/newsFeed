import * as types from '../actions/types';
const initialState = require('../initState');

const settingsReducer = function(settings = initialState.settings, action) {  
    switch(action.type) {
        case types.SETTINGS:
            return action.payload;
        default: 
            return settings;
    }
};

module.exports = settingsReducer;