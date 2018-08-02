const fetch = require("node-fetch");
const config = require("../../../config");
import * as types from '../types';

module.exports = {  
    getItem(data){
        return function(dispatch){
            var url = config.server.url+"/item/"+data.itemId
            fetch(url,{
                method: "GET", 
                headers: {
                    "Authorization": sessionStorage.getItem(config.sessionId),
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(function(res){
                console.log("res",res.shows);
                if(res.status === 401){
                    dispatch({ type: types.NOT_AUTH });
                }else{
                    dispatch({ 
                        type: types.GET_SHOW, 
                        payload: res.shows 
                    });
                }
            })
            .catch(function(e){
                console.log(e);
            }); 
    
        }
    },

    getShows(data){
        return function(dispatch){
            var url = config.server.url+"/shows"
            fetch(url,{
                method: "GET", 
                headers: {
                    "Authorization": sessionStorage.getItem(config.sessionId),
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(function(res){
                if(res.status === 401){
                    dispatch({ type: types.NOT_AUTH });
                }else{
                    dispatch({ 
                        type: types.GET_SHOWS, 
                        payload: res.shows
                    });
                }
            })
            .catch(function(e){
                console.log(e);
            }); 
        }
    }
}