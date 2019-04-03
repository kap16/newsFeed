const util = require('../util');
const Source = require('../models/source');
const jwtDecode = require('jwt-decode');

module.exports = {

  /** 
   * get a specific source
   * @param req request object
   * @param res response object
   */
  getSource(req, res) {
    var data = req.body
    var decoded = jwtDecode(req.get('Authorization'));
    Source.findOne({ id: data._id }, function (err, source) {
      if (err) {
        util.logError(err);
      } else {
        res.send({ source: source });
      }
    });
  },

  /** 
   * get multiple sources
   * @param req request object
   * @param res response object
   */
  getSources(req, res) {
    var decoded = jwtDecode(req.get('Authorization'));
    Source.find({ createdBy: decoded.id }, function (err, sources) {
      if (err) {
        util.logError(err);
      }
      var resBody = { sources: sources };
      util.logSuccess("Success: got sources");
      res.send(resBody);
    });
  },

  /** 
   * adds a source to the database
   * @param req request object
   * @param res response object
   */
  addSource(req, res) {
    var data = req.body;
    var decoded = jwtDecode(req.get('Authorization'));
    console.log(decoded);
    if (decoded.id == undefined) {
      util.logError("cant find user");
      res.send({ message: 'unauthorized: cannot find user' });
    } else {
      util.log("found user");
      Source.find({ link: data.link }, function (err, sources) {
        if (err) {
          util.logError(err);
        } else if (sources.length > 0) {
          util.logError(sources[0]);
          res.status(200).send({ message: 'Source with this url already exists' });
        } else {
          var currTime = new Date().toISOString();
          let source = new Source({
            title: data.title,
            description: data.desc,
            link: data.link,
            createdOn: currTime,
            createdBy: decoded.id,
            updatedOn: currTime
          });
          source.save(function (err) {
            if (err) {
              util.logError(err);
              res.status(500).send();
            }
            console.log(source);
            res.status(200).send();
          })
        }
      });
    }
  },

  /** 
   * updates source information
   * @param req request object
   * @param res response object
   */
  updateSource(req, res) {
    var data = req.body;
    var decoded = jwtDecode(req.get('Authorization'));
    if (decoded.id == undefined) {
      res.send({ message: 'unauthorized: cannot find user' });
    } else {
      Source.findOne({ 'createdBy': decoded.id, _id: req.params.id }, function (err, source) {
        if (err) {
          util.logError(err);
        } else {
          util.log("Gonna update a source");
          var currTime = new Date().toISOString();
          source.set({
            title: data.title,
            description: data.desc,
            link: data.link,
            updatedOn: currTime
          });

          source.save(function (err, updatedSource) {
            if (err) console.log(err);
            console.log(updatedSource);
            var resBody = { source: updatedSource };
            res.send(resBody);
          });
        }
      })
    }
  },

  /** 
   * delete source from database
   * @param req request object
   * @param res response object
   */
  deleteSource(req, res) {
    var decoded = jwtDecode(req.get('Authorization'));
    var data = req.body
    if (decoded.id == undefined) {
      res.send({ message: 'unauthorized: cannot find user' });
    } else {
      Source.findByIdAndRemove({
        _id: data.id
      }).then(function (source) {
        res.send(source);
      }).catch(function(e){
        console.log(e)
      });
    }
  }
}