const config = require("../../config");
import * as types from '../actions/types';
const initialState = require('../initState');
import { browserHistory } from 'react-router';

const sessionReducer = function (session = initialState.session, action) {
  switch (action.type) {
    case types.AUTH:
      browserHistory.push('/');
      session = {
        ...session,
        session: action.payload
      }
      return !!sessionStorage.getItem(config.sessionId.toString());
    case types.UNAUTH:
      browserHistory.push('/login');
      session = {
        ...session,
        session: null
      }
      return !!sessionStorage.getItem(config.sessionId.toString());
    default:
      return session;
  }
};

module.exports = sessionReducer;