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

function updateLocalStorageWithNewArray(cartArray) {
    localStorage.setItem("cartItems", JSON.stringify(cartArray))
}

function changeQtyOfItemInLocalStorage(cartArray, productId, direction) {
    const itemInCartArray = (element) => element.id === productId
    const index = cartArray.findIndex(itemInCartArray)
    if (direction === "increase") {
        cartArray[index].qty += 1
    } else {
        // CATCH USER TRYING TO REMOVE ITEM BY SETTING QTY TO 0
        // FALSE WILL THROW A WARNING IN handleDecreaseQty in Cart.js
        if (cartArray[index].qty - 1 < 1) return false
        // OTHERWISE DECREASE THE QTY
        cartArray[index].qty -= 1
    }

    return cartArray
}

function removeFromCart(itemId) {
    removeItemFromLocalStorage(itemId)
}

function addItemToLocalStorage(item) {
    let existingCart = localStorage.getItem("cartItems")
        ? localStorage.getItem("cartItems")
        : "[]"
    let cartArray = JSON.parse(existingCart)
    let productIdsInCart = cartArray.map((element) => element.id)
    // IF A USER ADDS A PRODUCT THAT IS ALREADY IN THE CART
    // THEN INCREASE THE QTY OF THAT PRODUCT INSTEAD
    if (productIdsInCart.includes(item._id)) {
        cartArray = changeQtyOfItemInLocalStorage(
            cartArray,
            item._id,
            "increase"
        )
    } else {
        // OTHERWISE JUST ADD THE NEW PRODUCT TO THE CART ARRAY
        cartArray.push({ id: item._id, qty: 1, item: item })
    }
    // SET THE NEW CART ARRAY
    updateLocalStorageWithNewArray(cartArray)
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
    updateLocalStorageWithNewArray(reducedCartItems)
}

function generateTotalPriceOfCart(cart) {
    let tempTotal = 0
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i]
        tempTotal += element.qty * element.item.price
    }
    return tempTotal
}

module.exports = {
    addItemToCart,
    removeFromCart,
    getCartItemsFromLocalStorage,
    changeQtyOfItemInLocalStorage,
    updateLocalStorageWithNewArray,
    generateTotalPriceOfCart,
}
