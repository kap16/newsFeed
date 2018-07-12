import * as types from '../actions/types';
const initialState = require('../initState');

const itemsReducer = function(items = initialState.items, action) {  
    switch(action.type) {
        case types.GET_ITEM:
            return Object.assign(item, action.payload);    
        case types.GET_ITEM:
            return Object.assign(items, action.payload);
        default: 
            return items;
    }
};

module.exports = itemsReducer;