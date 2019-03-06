const express = require('express');
const router = express.Router();
const item = require('../src/item');

// get all items from the database
router.get('/items', function (req, res) {
  item.update(req, res)
  item.getItems(req, res);
});

// get a specific item from the database
router.get('/item/:id', function (req, res) {
  item.getItem(req, res);
});

// updates database with new entries
router.put('/items/update', function (req, res) {
  item.update(req, res);
});

// update item in database
router.put('/item/:id', function (req, res) {
  // TODO
});

module.exports = router;