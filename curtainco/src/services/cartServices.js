const { ACTIONS } = require("../config/stateReducer")

function addItemToCart(item, dispatch) {
    // ADD TO LOCAL STORAGE
    addItemToLocalStorage(item)

    // // SHOW SNACKBAR
    // dispatch({
    //     type: ACTIONS.SET_SNACKBAR,
    //     payload: {
    //         open: true,
    //         success: "success",
    //         message: "Added item to cart",
    //     },
    // })
    // // ADD TO STATE
    // dispatch({
    //     type: ACTIONS.ADD_TO_CART,
    //     payload: item,
    // })
}

// function updateCart(item) {}

function removeFromCart(itemId) {
    removeItemFromLocalStorage(itemId)
}

function addItemToLocalStorage(item) {
    let existingCart = localStorage.getItem("cartItems")
        ? localStorage.getItem("cartItems")
        : "[]"

    let cartArray = JSON.parse(existingCart)
    let cartItemKeys = Object.keys(cartArray)
    // if (!cartItemKeys.includes(item._id)) {
    cartArray.push({ id: item._id, qty: 1, item: item })
    localStorage.setItem("cartItems", JSON.stringify(cartArray))
    // } else {
    // return alert("this object already exists in the cart")
    // }
}

function getCartItemsFromLocalStorage() {
    let existingCartStr = localStorage.getItem("cartItems")
        ? localStorage.getItem("cartItems")
        : "[]"
    const cartItems = JSON.parse(existingCartStr)
    return cartItems
}

function removeItemFromLocalStorage(itemId) {
    let existingCartItems = getCartItemsFromLocalStorage()
    let reducedCartItems = existingCartItems.filter(
        (item) => item.id !== itemId
    )
    localStorage.setItem("cartItems", JSON.stringify(reducedCartItems))
}

module.exports = {
    addItemToCart,
    // updateCart,
    removeFromCart,
    getCartItemsFromLocalStorage,
}
