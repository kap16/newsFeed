// must corespond to a reducer in reducers folder
module.exports = {
    test: null,
    modal: {
        type: "",
        active: false
    },
    items: [],
    session: !!sessionStorage.jwt
};