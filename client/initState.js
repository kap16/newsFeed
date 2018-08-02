// must corespond to a reducer in reducers folder
const config = require('../config');

const initState = {
    test: null,
    modal: {
        type: "",
        active: false
    },
    items: [],
    session: !!sessionStorage.getItem(config.sessionId.toString())
};

module.exports = initState;