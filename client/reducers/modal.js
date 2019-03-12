import * as types from '../actions/types';
const initialState = require('../initState');

const modalReducer = function (modal = initialState.modal, action) {
  switch (action.type) {
    case types.MODAL:
      return { type: types.MODAL, active: true };
    case types.ADD_SOURCE:
      return { type: types.ADD_SOURCE, active: true };
    case types.EDIT_SOURCE:
      return { type: types.EDIT_SOURCE, /*source: action.payload,*/ active: true };
    case types.FILTER_FEED:
      return { type: types.FILTER_FEED, active: true };
    case types.MODAL_ABOUT:
      return { type: types.MODAL_ABOUT, active: true };
    case types.CLEAR_MODALS:
      return { type: "", active: false };
    default:
      return modal;
  }
};

module.exports = modalReducer;