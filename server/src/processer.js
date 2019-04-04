const util = require('../util');
const Source = require('../models/source');
const Item = require('../models/item');

module.exports = {

  /** 
   * remove feed items in bulk
   * @param id feed source's id
   */
  removeArticlesBulk(id) {
    Item.deleteMany({ sou: id }, function (err, source) {
      if (err) {
        util.logError(err);
      } else {
        util.logSuccess("Removed Items");
      }
    });
  }
}