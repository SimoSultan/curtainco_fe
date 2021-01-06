import React, { useState, useEffect } from "react"
import PayPal from "./PayPal"
import CartList from "./CartList"
import CartTotal from "./CartTotal"

import { Typography, Grid, Box } from "@material-ui/core"
import {
    getCartItemsFromLocalStorage,
    changeQtyOfItemInLocalStorage,
    updateLocalStorageWithNewArray,
    removeFromCart,
    generateTotalPriceOfCart,
} from "../../services/cartServices"
import { sendRequestToPayPal } from "../../services/orderServices"
import useStyles from "./CartStyles"

function Cart() {
    const classes = useStyles()
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentFailed, setPaymentFailed] = useState(false)
    const [paymentCancelled, setPaymentCancelled] = useState(false)

    // GET THE ITEMS FROM LOCAL STORAGE
    function updateCartInStateFromLocalStorage() {
        const cartItems = getCartItemsFromLocalStorage()
        // console.log(cartItems)
        setCart(cartItems)
    }

    // GET THE ITEMS FROM LOCAL STORAGE ON FIRST LOAD
    useEffect(() => {
        updateCartInStateFromLocalStorage()
    }, [])

    // WHEN CART IN LOCAL STATE IS LOADED, CALCULATE THE TOTAL PRICE
    useEffect(() => {
        let tempTotal = generateTotalPriceOfCart(cart)
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

    function handleCheckout(event) {
        event.preventDefault()
        console.log(cart)
        let customer = {}
        const order = {
            customer: customer,
            items: cart,
            totalPrice: totalPrice,
            paymentData: {},
        }
        console.log(order)
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

        try {
            let response = await sendRequestToPayPal(payload)
            console.log(response)
            // setPaymentSuccess(true) // modal confirmation?
            // clears the cart afterwards then redirects somewhere?
            return response
        } catch (error) {
            console.log(error)
        }
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

    return (
        <>
            <Typography variant="h3">Cart Page</Typography>
            <CartList
                cart={cart}
                handleRemove={handleRemove}
                handleIncreaseQty={handleIncreaseQty}
                handleDecreaseQty={handleDecreaseQty}
            />
            <Box p={4}>
                <Grid
                    container
                    justify="flex-end"
                    className={classes.cartTotalCont}
                >
                    <Grid item xs={6}>
                        <CartTotal
                            total={totalPrice}
                            handleCheckout={handleCheckout}
                        />
                    </Grid>
                </Grid>
                <PayPal
                    handleSuccess={handleSuccess}
                    handleError={handleError}
                    handleCancel={handleCancel}
                    totalPrice={totalPrice}
                />
            </Box>
        </>
    )
}

export default Cart
