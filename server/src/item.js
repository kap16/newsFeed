const util = require('../util');
const Item = require('../models/item');
const jwtDecode = require('jwt-decode');
const Source = require('../models/source');
const Parser = require('rss-parser');

/** 
 * updates database with new entries
 * @param array consisting of the sources associated with the user
 * @param userId id of the user related to this feed
 * @param callback callback functon
 */
async function asyncForEach(array, userId, callback) {
  let parser = new Parser();
  for (let i = 0; i < array.length; i++) {
    let feed = await parser.parseURL(array[i].link);
    
    var items2 = feed.items
    for (let j = 0; j < items2.length; j++) {
      let items = await Item.find({ link: items2[j].link }, function (err, item) {
        if (err) {
          util.logError(err);
        } else if (item.length>0) {
          console.log("skipped "+items2[j].title);
        } else {
          let newItem = new Item({
            title: items2[j].title,
            link: items2[j].link,
            pubDate: new Date(items2[j].pubDate),
            guid: items2[j].guid,
            snippet: items2[j].contentSnippet,
            description: items2[j].content,
            categories: items2[j].categories,
            createdOn: new Date().toISOString(),
            createdBy: userId,
            source: array[i].id
          });
          newItem.save(function (error) {
            if (error) {
              console.log(error);
            }
          })
        }
      })
    }
  }
  callback();
}

module.exports = {
  /** 
   * get rss feed items from database
   * @param req request object
   * @param res response object
   */
  getItem(req, res) {
    var decoded = jwtDecode(req.get('Authorization'));
    Item.findOne({ id: data._id, createdBy: decoded._id }, function (err, items) {
      if (err) {
        util.logError(err);
      } else {
        res.send(items);
      }
    });
  },

  /** 
   * get rss feed items from database
   * @param req request object
   * @param res response object
   */
  getItems(req, res) {
    var decoded = jwtDecode(req.get('Authorization'));
    if (decoded.id == undefined) {
      res.send({ message: 'unauthorized: cannot get lists' });
    } else {
      Item.find({ createdBy: decoded.id })
        .sort({ pubDate: -1 })
        .limit(20)
        .exec(function (err, items) {
          if (err) {
            util.logError(err);
          } else {
            var resObj = JSON.stringify({
              items: items
            });
            res.send(resObj);
          }
        });
    }
  },

  /** 
   * updates database with new entries
   * @param req request object
   * @param res response object
   */
  update(req, res) {
    var decoded = jwtDecode(req.get('Authorization'));
    Source.find({ createdBy: decoded.id }, function (err, sources) {
      if (err) {
        util.logError(err);
      } else {
        asyncForEach(sources, decoded.id, function(){
          util.logSuccess("done");
        });
      }
    })
  }
}