import React from "react"
import { Grid } from "@material-ui/core"
import { removeFromCart } from "../../services/cartServices"
import CartItem from "./CartItem"

function CartList({
    cart,
    updateCartInStateFromLocalStorage,
    handleIncreaseQty,
    handleDecreaseQty,
}) {
    function handleRemove(event) {
        event.preventDefault()
        removeFromCart(event.currentTarget.value)
        updateCartInStateFromLocalStorage()
    }

    return (
        <Grid
            container
            direction="column"
            // justify="center"
            // alignItems="center"
            spacing={3}
        >
            {cart.length !== 0
                ? cart.map((item) => (
                      <CartItem
                          itemInCart={item}
                          handleRemove={handleRemove}
                          handleIncreaseQty={handleIncreaseQty}
                          handleDecreaseQty={handleDecreaseQty}
                      />
                  ))
                : "no items"}
        </Grid>
    )
}

export default CartList
