const { ACTIONS } = require("../config/stateReducer")

function addToCart(item, dispatch) {
    dispatch({
        type: ACTIONS.ADD_TO_CART,
        payload: item,
    })
}

function updateCart(item) {}

function removeFromCart(item) {}

module.exports = {
    addToCart,
    updateCart,
    removeFromCart,
}
