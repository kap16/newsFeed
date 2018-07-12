import * as types from '../actions/types';
const initialState = require('../initState');

const testReducer = function(test = initialState.test, action) {  
    switch(action.type) {
        case types.TEST:
            return "This works";
        default: 
            return "Test";
    }
}
 module.exports = testReducer