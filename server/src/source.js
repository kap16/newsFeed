const util = require('../util');
const Source = require('../models/source');

module.exports = {
    
    /** 
     * get a specific source
     * @param req request object
     * @param res response object
     */
    getSource(req, res){
        var data = req.body
        Source.findOne({id: data._id},function(err,source){
            if (err){
                util.logError(err);
            }else{
                res.send({source:source});
            }
        });
    },

    /** 
     * get multiple sources
     * @param req request object
     * @param res response object
     */
    getSources(req, res){
        var data = req.body
        Source.find({},function(err,sources){
            if (err){
                util.logError(err);
            }
            util.logSuccess("Success");
            res.send({sources: sources});
        });
    },

    /** 
     * adds a source to the database
     * @param req request object
     * @param res response object
     */
    addSource(req, res){
        var data = req.body
        Source.find({link: data.link},function(err,sources){
            if (err){
                util.logError(err);
            }else if(sources.length > 0){
                util.logError(sources[0]);
                res.status(200).send({message :'Source with this url already exists'});
            }else{
                var currTime = new Date().toISOString();
                let source = new Source({
                    title: data.title,
                    description: data.desc, 
                    link: data.link,
                    createdOn: currTime,
                    updatedOn: currTime
                });
                source.save(function(err){
                    if(err){
                        util.logError(err);
                        res.status(500).send();
                    }
                    res.status(200).send();
                })
            }
        });
    },

    /** 
     * updates source information
     * @param req request object
     * @param res response object
     */
    update(req, res){
        var data = req.body;
        Source.find({}, function(err,sources){
            if (err){
                util.logError(err);
            }else{
                
            }
        })
    },

    /** 
     * delete source from database
     * @param req request object
     * @param res response object
     */
    delete(req, res){
        var data = req.body;
        Source.find({}, function(err,sources){
            if (err){
                util.logError(err);
            }else{
                
            }
        })
    }
}