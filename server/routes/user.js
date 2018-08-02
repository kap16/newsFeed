const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../src/user');

// register a user
router.post('/signup', function(req,res){
    user.register(req,res);
});

// log user in
router.post('/login',passport.authenticate('local'), function(req,res){
    user.login(req,res);
});

// gets a single user
router.get('/user/:id', function(req,res){
    user.getUser(req,res);
});

// gets multiple users
router.get('/users', function(req,res){
    user.getUsers(req,res);
});

// updates user
router.put('/user/:id', function(req,res){
    user.updateUser(req,res);
});

// deletes a user  
router.delete('/source/:id', function(req,res){
    user.deleteUser(req,res);
});

module.exports = router;