const express = require('express');
const router = express.Router();
const fs = require('fs');

const item = require('./src/item');
const source = require('./src/source');
const user = require('./src/user');
const misc = require('./src/misc');

// get all items from the database
router.get('/items', function(req,res){
    item.getItems(req,res);
});

// get a specific item from the database
router.get('/item/:id', function(req,res){
    item.getItem(req,res);
});

// updates database with new entries
router.put('/items/update', function(req,res){
    item.update(req,res);
});

// update item in database
router.put('/item/:id', function(req,res){
    // TODO
});

// updates user settings 
router.put('/settings', function(req,res){
    misc.updateSettings(req,res)
});

// adds source to database
router.post('/source', function(req,res){
    source.addSource(req,res);
});

// get all sources from the database
router.get('/sources', function(req,res){
    source.getSources(req,res);
});

// get a specific item from the database
router.get('/source/:id', function(req,res){
    source.getSource(req,res);
});

// updates database with new entries
router.put('/source/:id', function(req,res){
    source.update(req,res);
});

// removes a source 
router.delete('/source', function(req,res){
    source.delete(req,res)
});

// register a user when user doesn't require a login
router.post('/autoRegister', function(req,res){
    user.autoRegister(req,res)
});

// register a user when user requires a login
router.post('/register', function(req,res){
    user.register(req,res)
});

// log user in
router.post('/login', function(req,res){
    user.login(req,res)
});

// gets a single user
router.get('/user/:id', function(req,res){
    user.getUser(req,res)
});

// gets multiple users
router.get('/users', function(req,res){
    user.getUsers(req,res)
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