import * as types from '../actions/types';
import initialState from '../initState'

const itemsReducer = function (items = initialState.items, action) {
  switch (action.type) {
    case types.GET_ITEM:
      return action.payload;
    case types.GET_ITEMS:
      return action.payload;
    default:
      return items;
  }
};

export default itemsReducer