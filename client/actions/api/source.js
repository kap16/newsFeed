const fetch = require("node-fetch");
const config = require("../../../config");
import * as type from '../types';

/** 
 * gets all the user's sources from the database
 */
export function getSources(data){
    return function(dispatch){
        var url = config.server.url+"/sources"
        fetch(url,{
            method: "GET", 
            headers: {
                "Authorization": sessionStorage.getItem(config.sessionId),
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(function(res){
            dispatch({ type: type.GET_SOURCES, payload: res.sources });
            console.log(res);
        })
        .catch(function(e){
            console.log(e);
        }); 

    }
}