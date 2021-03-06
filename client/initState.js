// must corespond to a reducer in reducers folder (except index file)
const config = require('../config');

const initState = {
  test: null,
  modal: {
    type: "",
    active: false,
    data: null
  },
  items: [],
  settings: null,
  sources: null,
  session: !!sessionStorage.getItem(config.sessionId.toString())
};

export default initState;