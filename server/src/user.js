// Import Libraries
const chalk = require('chalk');
const bcrypt = require('bcrypt');
var User = require('../models/user');
const express = require('express');
const jwt = require('jsonwebtoken'); 
const util = require('../util');
const config = require('../../config');

module.exports = {
    /** 
     * registers user from 
     * @param req request object
     * @param res response object
     */
    register(req,res){
        var data = req.body;
        const username = data.username;
        const password = data.password; 
        const password2 = data.password2;
        const email = data.email;

        req.checkBody('username','Username field is required').notEmpty();
        req.checkBody('password','Password field is required').notEmpty();
        req.checkBody('password2','Passwords do not match').equals(password2);
        req.checkBody('email','Email field is required').notEmpty();

        const errors = req.validationErrors();
        if(errors){
            util.logError('error during validation');
            console.log(errors);
            var resBody = {
                url: '/register'
            };
            res.json(resBody);
        }else{
            let newUser = new User({
                username:username,
                email:email, 
                password:password,
                createdOn: new Date().toISOString()
            });
            bcrypt.genSalt(10, function(err,salt){
                bcrypt.hash(newUser.password, salt, function(err,hash){
                    if(err){
                        util.logError('error during hashing');
                        console.log(err);
                    }
                    newUser.password = hash;
                    newUser.save(function(error){
                        if(error){
                            console.log(error);
                            return;
                        }else{
                            var resBody = {
                                user:{
                                    id: newUser._id,
                                    username: newUser.username,
                                    password: newUser.password,
                                    createdOn: newUser.createdOn
                                },
                                statusCode: res.statusCode,
                            };
                            var token = util.generateToken(resBody);
                            console.log('Token: '+token);
                            res.status(200).send({body: resBody, token: token});
                        }
                    })
                });
            });
        }
    },

    /** 
     * registers user when app doesn't require user login
     * @param req request object
     * @param res response object
     */
    autoRegister(req,res){
        var data = req.body;
        let newUser = new User({
            createdOn: new Date().toISOString()
        });
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(newUser.password, salt, function(err,hash){
                if(err){
                    util.logError('error during hashing');
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(error){
                    if(error){
                        console.log(error);
                        return;
                    }else{
                        var resBody = {
                            user:{
                                id: newUser._id,
                                username: newUser.username,
                                password: newUser.password,
                                createdOn: newUser.createdOn
                            },
                            statusCode: res.statusCode,
                        };
                        var token = util.generateToken(resBody);
                        console.log('Token: '+token);
                        res.status(200).send({body: resBody, token: token});
                    }
                })
            });
        });
    },

    /** 
     * logs user in
     * @param req request object
     * @param res response object
     */
    login(req, res) {
        var msg;
        req.checkBody('username','Username field is required').notEmpty();
        req.checkBody('password','Password field is required').notEmpty();
        var err = req.validationErrors();
        
        if (err) {
            console.log(err);
            msg = "Internal server error"
            util.logError(msg)
            res.status(401).send({message:msg});
        }
        if (!req.user) {
            msg = "no such user found"
            util.logError(msg)
            res.status(401).send({message:msg});
        }
        req.logIn(req.user, function(err) {
            if (err) {
                console.log(err) 
                res.status(500).send({message:"Cannot log you in"});
            }
            var resBody = {
                user:{
                    id: req.user._id,
                    username: req.user.username
                }
            };
            var token = util.generateToken(resBody);
            res.status(200).send({body: resBody, token: token});
        });
    },

    /** 
     * update a user in the db
     * @param req request object
     * @param res respomse object
     */
    updateUser(req,res){
        User.findByIdAndUpdate({_id: req.params.id},req.body).then(function(user){
            User.findOne({_id: req.params.id}).then(function(user){
                res.send(user);
            });
        })
    },

    /** 
     * delete a user from the database
     * @param req request object
     * @param res respomse object
     */
    deleteUser(req,res,next){
        //console.log(req.params.id);
        User.findByIdAndRemove({
            _id: req.params.id
        }).then(function(user){
            res.send(user);
        });
    }
}