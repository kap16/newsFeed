const fetch = require("node-fetch");
const config = require("../../../config");
import * as type from '../types';

export function signUp(data){
    return function(dispatch){
        var url = config.api+"/signup"
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

export function loginUser(data){
    return function(dispatch){
        var url = config.api+"/login"
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
            console.log(res);
            if(res.status === 401 || res.name === "Fetch Error"){
                dispatch({ type: type.UNAUTH });
            }else{
                console.log('in login', res);
                sessionStorage.setItem(config.sessionId.toString(), res.token);
                dispatch({ type: type.AUTH, payload: res.user});
            }
        })
        .catch(function(e){
            console.log(e);
        }); 

    }
}

export function logout(){
    const session = config.sessionId.toString()
    return function(dispatch){
        dispatch({ type: type.UNAUTH });
        sessionStorage.removeItem(session, { path: '/' });  
    }
}