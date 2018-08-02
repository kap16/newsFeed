const express = require('express');
const router = express.Router();
const source = require('../src/source');

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
router.post('/source/:id', function(req,res){
    source.updateSource(req,res);
});

// removes a source 
router.delete('/source', function(req,res){
    source.deleteSource(req,res)
});

module.exports = router;