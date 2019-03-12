import * as types from './types';

export function showModal() {
  return function (dispatch) {
    dispatch({
      type: types.MODAL
    });
  }
}

export function hideModal() {
  return function (dispatch) {
    dispatch({
      type: types.CLEAR_MODALS
    });
  }
}

export function showAddSourceModal() {
  return function (dispatch) {
    dispatch({
      type: types.ADD_SOURCE
    });
  }
}

export function showEditSourceModal() {
  return function (dispatch) {
    dispatch({
      type: types.EDIT_SOURCE,
    });
  }
}

export function showFilterFeedModal() {
  return function (dispatch) {
    dispatch({
      type: types.FILTER_FEED,
    });
  }
}

export function showAboutModal() {
  return function (dispatch) {
    dispatch({
      type: types.MODAL_ABOUT
    });
  }
}