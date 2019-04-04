const fetch = require("node-fetch");
const config = require("../../../config");
import * as types from '../types';

export function getItem(data) {
    return function (dispatch) {
      var url = config.server.url + "/item/" + data.itemId
      fetch(url, {
        method: "GET",
        headers: {
          "Authorization": sessionStorage.getItem(config.sessionId),
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(function (res) {
          if (res.status === 401) {
            dispatch({ type: types.UNAUTH});
          } else {
            dispatch({
              type: types.GET_ITEM,
              payload: res.item
            });
          }
        })
        .catch(function (e) {
          console.log(e);
        });

    }
  }

export function getItems() {
  return function (dispatch) {
    var url = config.server.url + "/items"
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": sessionStorage.getItem(config.sessionId),
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(function (res) {
        if (res.status === 401) {
          dispatch({ type: types.UNAUTH});
        } else {
          dispatch({
            type: types.GET_ITEMS,
            payload: res.items
          });
        }
      })
      .catch(function (e) {
        console.log(e);
      });
  }
}