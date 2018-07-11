const fetch = require("node-fetch");
const config = require("../../../config.json");
import { browserHistory } from 'react-router';  
import * as type from '../types';

export function autoSignUp(data){
    return function(dispatch){
        var url = config.api+"/autoRegister"
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
            sessionStorage.setItem(config.SESSION_ID, res.token);
            dispatch({ type: type.AUTH });
            console.log(res);
        })
        .catch(function(e){
            console.log(e);
        }); 

    }
}

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
            sessionStorage.setItem(config.SESSION_ID, res.token);
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
        console.log(url);
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
            console.log(res.body);
            if(res.status === 401 || res.name === "Fetch Error"){
                dispatch({ type: type.UNAUTH });
            }else{
                sessionStorage.setItem(config.SESSION_ID, res.token);
                dispatch({ type: type.AUTH, payload: res.body.user});
            }
        })
        .catch(function(e){
            console.log(e);
        }); 

    }
}

export function logout(){
    return function(dispatch){
        dispatch({ type: type.UNAUTH });
        sessionStorage.removeItem('jwt', { path: '/' });  
    }
}