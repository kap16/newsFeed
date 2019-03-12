const moment = require('moment');

export function convertDateTime(str) {
  let date = moment(str);
  var dateCompoment = date.utc().format('YYYY-MM-DD');
  var timeCompoment = date.utc().format('HH:mm');
  var output = dateCompoment + " at " + timeCompoment;
  return output;
}