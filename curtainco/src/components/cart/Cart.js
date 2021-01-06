import React, { useState, useEffect } from "react"
import api from "../../config/api"
import Paypal from "./Paypal"

import { Typography } from "@material-ui/core"
import {
    getCartItemsFromLocalStorage,
    changeQtyOfItemInLocalStorage,
    updateLocalStorageWithNewArray,
    removeFromCart,
} from "../../services/cartServices"

import CartList from "./CartList"
import CartTotal from "./CartTotal"

function Cart() {
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentFailed, setPaymentFailed] = useState(false)
    const [paymentCancelled, setPaymentCancelled] = useState(false)

    // GET THE ITEMS FROM LOCAL STORAGE
    function updateCartInStateFromLocalStorage() {
        const cartItems = getCartItemsFromLocalStorage()
        console.log(cartItems)
        setCart(cartItems)
    }

    // GET THE ITEMS FROM LOCAL STORAGE ON FIRST LOAD
    useEffect(() => {
        updateCartInStateFromLocalStorage()
    }, [])

    // WHEN CART IN LOCAL STATE IS LOADED, CALCULATE THE TOTAL PRICE
    useEffect(() => {
        let tempTotal = 0
        for (let item in cart) {
            tempTotal += item.price
        }
        setTotalPrice(tempTotal)
    }, [cart])

    function handleIncreaseQty(event) {
        event.preventDefault()
        let productId = event.currentTarget.value
        let cartArrayWithUpdatedQty = changeQtyOfItemInLocalStorage(
            cart,
            productId,
            "increase"
        )
        updateLocalStorageWithNewArray(cartArrayWithUpdatedQty)
        updateCartInStateFromLocalStorage()
    }

    function handleDecreaseQty(event) {
        event.preventDefault()
        let productId = event.currentTarget.value
        let errorOrArray = changeQtyOfItemInLocalStorage(
            cart,
            productId,
            "decrease"
        )
        if (!errorOrArray) {
            return alert(
                "Cannot decrease quantity below 1. Please remove the item if you don't want it anymore."
            )
        }
        updateLocalStorageWithNewArray(errorOrArray)
        updateCartInStateFromLocalStorage()
    }

    function handleRemove(event) {
        event.preventDefault()
        removeFromCart(event.currentTarget.value)
        updateCartInStateFromLocalStorage()
    }

    const testProduct = [
        {
            name: "Series 51 White Track",
            colour: "White",
            category: "Track",
            type: "Powder Coated",
            single: true,
            finialStyle: "Colonial",
            finialColour: "White",
            location: "Ceiling",
            price: 999,
        },
    ]

    async function handleSuccess(data) {
        // data contains the response from paypal which is to be stored in server
        const payload = {}
        payload.totalPrice = totalPrice
        // payload.items = cart
        payload.items = testProduct
        payload._id = data.paymentID
        payload.paymentData = data
        const response = await api.post("/orders", payload)
        // setPaymentSuccess(true) // modal confirmation?
        // clears the cart afterwards then redirects somewhere?
        console.log(response)
        return response
    }

    function handleError(data) {
        // data contains the response from paypal which is to be stored in server
        // setPaymentFailed(true) // modal ??
        console.log(data)
        console.log("There was an error when using Paypal")
    }

    function handleCancel(data) {
        // data contains the response from paypal which is to be stored in server
        // setPaymentCancelled(true) // modal ??
        console.log(data)
        console.log("Transaction cancelled")
    }

    // would be a state setTotalPrice which was
    // extracted from every item added to cart
    // totalPrice is then passed to Paypal component
    // const totalPrice = 10
    return (
        <>
            <Typography variant="h3">Cart Page</Typography>
            {/* <Paypal
                handleSuccess={handleSuccess}
                handleError={handleError}
                handleCancel={handleCancel}
                totalPrice={totalPrice}
            /> */}
            <CartList
                cart={cart}
                handleRemove={handleRemove}
                handleIncreaseQty={handleIncreaseQty}
                handleDecreaseQty={handleDecreaseQty}
            />
            <CartTotal />
        </>
    )
}

export default Cart
