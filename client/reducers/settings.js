import * as types from '../actions/types';
import initialState from '../initState'

const settingsReducer = function (settings = initialState.settings, action) {
  switch (action.type) {
    case types.SETTINGS:
      return action.payload;
    default:
      return settings;
  }
};

export default settingsReducer