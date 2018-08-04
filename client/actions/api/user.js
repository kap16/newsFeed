const fetch = require("node-fetch");
const config = require("../../../config");
const jwtDecode = require('jwt-decode');
import * as type from '../types';

/** 
 * registers user to the application
 * @param data object containing form data
 */
export function signUp(data){
    return function(dispatch){
        var url = config.server.url+"/signup"
        fetch(url,{
            method: "POST", 
            body: JSON.stringify(data),  
            headers: {
                "Content-Length": Buffer.byteLength(data),
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(function(res){
            sessionStorage.setItem(config.sessionId, res.token);
            dispatch({ type: type.AUTH });
            console.log(res);
        })
        .catch(function(e){
            console.log(e);
        }); 

    }
}

/** 
 * logs user in
 * @param data object containing form data
 */
export function loginUser(data){
    return function(dispatch){
        var url = config.server.url+"/login"
        fetch(url,{
            method: "POST", 
            body: JSON.stringify(data),  
            headers: {
                "Content-Length": Buffer.byteLength(data),
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(function(res){
            if(res.status === 401 || res.name === "Fetch Error"){
                dispatch({ type: type.UNAUTH });
            }else{
                sessionStorage.setItem(config.sessionId.toString(), res.token);
                dispatch({ type: type.AUTH, payload: res.user});
            }
        })
        .catch(function(e){
            console.log(e);
        }); 

    }
}

/** 
 * get user settings
 */
export function getUser(){
    return function(dispatch){
        var id = jwtDecode(sessionStorage.getItem(config.sessionId)).id
        var url = config.server.url+"/user/"+id
        fetch(url,{
            method: "GET",
            headers: {
                "Authorization": sessionStorage.getItem(config.sessionId),
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(function(res){
            if(res.status === 401 || res.name === "Fetch Error"){
                dispatch({ type: type.UNAUTH });
            }else{
                dispatch({ type: type.SETTINGS, payload: res.settings});
            }
        }).catch(function(e){
            console.log(e);
        });    
    }
}

/** 
 * updates user settings
 * @param data object for updated user settings
 */
export function saveUser(data){
    return function(dispatch){
        var id = jwtDecode(sessionStorage.getItem(config.sessionId)).id
        var url = config.server.url+"/user/"+id
        fetch(url,{
            method: "POST",
            body: JSON.stringify(data), 
            headers: {
                "Authorization": sessionStorage.getItem(config.sessionId),
                "Content-Length": Buffer.byteLength(data),
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(function(res){
            if(res.status === 401 || res.name === "Fetch Error"){
                console.log("Could not update settings");
            }else{
                console.log("Updated user settings");
            }
        }).catch(function(e){
            console.log(e);
        });    
    }
}


/** 
 * logs user out from current session
 */
export function logout(){
    const session = config.sessionId.toString()
    return function(dispatch){
        dispatch({ type: type.UNAUTH });
        sessionStorage.removeItem(session, { path: '/' });  
    }
}