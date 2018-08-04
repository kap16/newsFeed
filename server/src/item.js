const util = require('../util');
const Item = require('../models/item');
const jwtDecode = require('jwt-decode');

module.exports = {
    
    /** 
     * get rss feed items from database
     * @param req request object
     * @param res response object
     */
    getItem(req, res){
        var decoded = jwtDecode(req.get('Authorization'));
        Item.findOne({id: data._id,createdBy:decoded._id},function(err,items){
            if (err){
                util.logError(err);
            }else{
                res.send(items);
            }
        });
    },

    /** 
     * get rss feed items from database
     * @param req request object
     * @param res response object
     */
    getItems(req, res){
        var decoded = jwtDecode(req.get('Authorization'));
        if (decoded.id == undefined){
            res.send({message: 'unauthorized: cannot get lists'});
        }else{
            Item.find({createdBy:decoded.id})
            .sort({pubDate: -1})
            //.limit(data.pagination)
            .exec(function(err,items){
                if (err){
                    util.logError(err);
                }else{
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
    update(req, res){
        var data = req.body;
        var decoded = jwtDecode(req.get('Authorization'));
        Source.find({}, function(err,sources){
            if (err){
                util.logError(err);
            }else{
                for (source in sources){
                    parser.parseURL(data.url, function(err, feed) {
                        console.log(feed.title);
                        feed.items.forEach(function(entry) {
                            console.log(entry.title + ':' + entry.link);
                        })
                    })
                }
            }
        })
    }
}