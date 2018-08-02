const fetch = require("node-fetch");
const config = require("../../../config");
import * as type from '../types';

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
            //dispatch({ type: type.GET_SOURCES });
            console.log(res);
        })
        .catch(function(e){
            console.log(e);
        }); 

    }
}