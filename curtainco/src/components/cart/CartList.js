import React from "react"
import { Grid, Typography } from "@material-ui/core"
import CartItem from "./CartItem"

function CartList({
    cart,
    handleRemove,
    handleIncreaseQty,
    handleDecreaseQty,
}) {
    return (
        <Grid container direction="column" spacing={3}>
            {cart.length !== 0 ? (
                cart.map((item, index) => (
                    <CartItem
                        itemInCart={item}
                        handleRemove={handleRemove}
                        handleIncreaseQty={handleIncreaseQty}
                        handleDecreaseQty={handleDecreaseQty}
                        key={`cart-item-${item.id}`}
                    />
                ))
            ) : (
                <Grid
                    item
                    container
                    justify="center"
                    alignItems="center"
                    spacing={6}
                >
                    <Grid item>
                        <Typography variant="h6" component="h6">
                            No items in cart
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}

export default CartList
