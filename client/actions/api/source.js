const fetch = require("node-fetch");
const config = require("../../../config");
import * as type from '../types';

/** 
 * adds source to the database
 */
export function addSource(data) {
  return function (dispatch) {
    var url = config.server.url + "/source"
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Authorization": sessionStorage.getItem(config.sessionId),
        "Content-Length": Buffer.byteLength(data),
        "Content-Type": "application/json"
      }
    })
    .then(out => out.json())
    .then(function (res) {
      console.log("Source was added")
      dispatch({ type: type.CLEAR_MODALS });
    })
    .catch(function (e) {
      console.log(e);
    });
  }
}

/** 
 * updates source in the database
 */
export function updateSource(data) {
  return function (dispatch) {
    var url = config.server.url + "/source/" + data.id
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Authorization": sessionStorage.getItem(config.sessionId),
        "Content-Length": Buffer.byteLength(data),
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(function (res) {
        console.log("Source was updated");
        dispatch({ type: type.CLEAR_MODALS });
      })
      .catch(function (e) {
        console.log(e);
      });;
  }
}

/** 
 * gets all the user's sources from the database
 */
export function getSources() {
  return function (dispatch) {
    var url = config.server.url + "/sources"
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": sessionStorage.getItem(config.sessionId),
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(function (res) {
        dispatch({ type: type.GET_SOURCES, payload: res.sources });
      })
      .catch(function (e) {
        console.log(e);
      });

  }
}

/** 
 * gets all the user's sources from the database
 */
export function deleteSource(data) {
  return function (dispatch) {
    var url = config.server.url + "/source"
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Authorization": sessionStorage.getItem(config.sessionId),
        "Content-Length": Buffer.byteLength(data),
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(function (res) {
        dispatch({ type: type.AUTH });
      })
      .catch(function (e) {
        console.log(e);
      });

  }
}