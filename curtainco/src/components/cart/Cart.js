import React, { useState, useEffect } from "react"
import PayPal from "./Paypal"
import CartList from "./CartList"
import CartTotal from "./CartTotal"
import { useHistory } from "react-router-dom"

import { Typography, Grid, Box, Button } from "@material-ui/core"
import {
    getCartItemsFromLocalStorage,
    changeQtyOfItemInLocalStorage,
    updateLocalStorageWithNewArray,
    removeFromCart,
    generateTotalPriceOfCart,
} from "../../services/cartServices"
import { createOrder } from "../../services/orderServices"
import useStyles from "./CartStyles"
import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

function Cart() {
    const classes = useStyles()
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const { state, dispatch } = useCurtainContext()
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentFailed, setPaymentFailed] = useState(false)
    const [paymentCancelled, setPaymentCancelled] = useState(false)
    // const history = useHistory()

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
        dispatch({
            type: ACTIONS.SET_SNACKBAR,
            payload: {
                open: true,
                success: "success",
                message: "Removed item from cart",
            },
        })
    }

    async function handleSuccess(data) {
        // data contains the response from paypal which is to be stored in server
        console.log("----SUCCESSFUL PAYPAL PURCHASE----")
        console.log(data)

        const payload = {
            _id: data.paymentID,
            customer: state.currentUser,
            totalPrice: totalPrice,
            items: cart,
            paymentData: data,
        }

        try {
            let response = await createOrder(payload)
            console.log(response)
            if (response.status === 201) {
                // TODO CLEAR THE CART AND REDIRECT TO THEIR ACCOUNT PAGE TO VIEW THE PURCHASE
                setPaymentSuccess(true) // modal confirmation?
                window.localStorage.clear()
                // history.push("/account")
            }

            return response
        } catch (error) {
            console.log(error)
        }
    }

    function handleError(data) {
        console.log("----ERROR PAYPAL PURCHASE----")
        // data contains the response from paypal which is to be stored in server
        setPaymentFailed(true) // modal ??
        dispatch({
            type: ACTIONS.SET_SNACKBAR,
            payload: {
                open: true,
                success: "error",
                message: "Something went wrong. Payment not successful.",
            },
        })
        console.log(data)
        console.log("There was an error when using Paypal")
    }

    function handleCancel(data) {
        console.log("----CANCEL PAYPAL PURCHASE----")
        // data contains the response from paypal which is to be stored in server
        setPaymentCancelled(true) // modal ??
        console.log(data)
        console.log("Transaction cancelled")
    }

    function isUserLoggedIn() {
        return state.currentUser !== null
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
                        {cart.length > 0 ? (
                            <CartTotal
                                total={totalPrice}
                                loginText="To purchase with PayPal, please log in first."
                            >
                                {isUserLoggedIn() ? (
                                    <PayPal
                                        handleSuccess={handleSuccess}
                                        handleError={handleError}
                                        handleCancel={handleCancel}
                                        totalPrice={totalPrice}
                                    />
                                ) : (
                                    <Link
                                        to={{
                                            pathname: "/login",
                                            state: {
                                                prevUrl: window.location.href,
                                            },
                                        }}
                                        className="link"
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                        >
                                            Log In
                                        </Button>
                                    </Link>
                                )}
                            </CartTotal>
                        ) : (
                            ""
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Cart
