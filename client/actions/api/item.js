const fetch = require("node-fetch");
const config = require("../../../config");
import * as types from '../types';

module.exports = {
  getItem(data) {
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
          console.log("res", res.item);
          if (res.status === 401) {
            dispatch({ type: types.NOT_AUTH });
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
  },

  getItems() {
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
            dispatch({ type: types.NOT_AUTH });
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
}