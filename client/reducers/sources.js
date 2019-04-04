import * as types from '../actions/types';
import initialState from '../initState'

const sourcesReducer = function (sources = initialState.sources, action) {
  switch (action.type) {
    case types.GET_SOURCE:
      return Object.assign(source, action.payload);
    case types.GET_SOURCES:
      return action.payload;
    default:
      return sources;
  }
};

export default sourcesReducer