import React from "react"
import { Grid, Typography, Button } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { removeFromCart } from "../../services/cartServices"

function CartList({ cart, updateCart }) {
    function handleRemove(event) {
        event.preventDefault()
        removeFromCart(event.currentTarget.value)
        updateCart()
    }
    return (
        <Grid
            container
            direction="column"
            // justify="center"
            // alignItems="center"
            spacing={2}
        >
            {cart.length !== 0
                ? cart.map((item, index) => (
                      <Grid
                          item
                          xs
                          container
                          justify="space-around"
                          alignItems="center"
                          key={`${item._id},${index}`}
                      >
                          <Grid item>
                              <Typography>{item.item.name}</Typography>
                          </Grid>

                          <Grid item>
                              <Typography>QTY: {item.qty}</Typography>
                          </Grid>
                          <Grid item>
                              <Button
                                  variant="contained"
                                  color="secondary"
                                  value={item.id}
                                  onClick={handleRemove}
                                  size="small"
                              >
                                  <CloseIcon /> Delete
                              </Button>
                          </Grid>
                      </Grid>
                  ))
                : "no items"}
        </Grid>
    )
}

export default CartList
