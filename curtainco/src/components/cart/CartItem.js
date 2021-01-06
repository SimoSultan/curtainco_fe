import React from "react"

import { Grid, Typography, IconButton, Paper } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import useStyles from "./CartStyles"
import { capitalize } from "../../helpers/appHelpers"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

function CartItem({
    itemInCart,
    handleRemove,
    handleIncreaseQty,
    handleDecreaseQty,
}) {
    const classes = useStyles()
    let productItem = itemInCart.item

    return (
        <Grid item xs container justify="center">
            <Paper className={classes.paper}>
                <Grid
                    item
                    xs
                    container
                    justify="space-between"
                    alignItems="center"
                    key={`cart-item-${itemInCart.id}`}
                >
                    <Grid item xs={2} container justify="center">
                        <img
                            src={productItem.imgUrl}
                            alt={productItem.name}
                            className={classes.cartItemImg}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                        xs={5}
                    >
                        <Grid item>
                            <Typography variant="h5" component="h5">
                                {capitalize(productItem.name)}
                            </Typography>
                        </Grid>
                        {productItem.colour ? (
                            <>
                                <Grid item>
                                    <Typography>
                                        Colour: {capitalize(productItem.colour)}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        Category: {productItem.category}
                                    </Typography>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item>
                                    <Typography>
                                        Collection Contains:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{`${productItem.track.length}x Track`}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{`${productItem.fabric.length}x Fabric`}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{`${productItem.accessory.length}x Accessory`}</Typography>
                                </Grid>
                            </>
                        )}
                    </Grid>

                    <Grid
                        item
                        xs={2}
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={4} container justify="center">
                            <IconButton
                                size="small"
                                className={classes.secondaryIconButton}
                                onClick={handleDecreaseQty}
                                value={itemInCart.id}
                            >
                                <RemoveIcon color="secondary" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4} container justify="center">
                            <Typography>QTY: {itemInCart.qty}</Typography>
                        </Grid>
                        <Grid item xs={4} container justify="center">
                            <IconButton
                                size="small"
                                className={classes.primaryIconButton}
                                onClick={handleIncreaseQty}
                                value={itemInCart.id}
                            >
                                <AddIcon color="primary" />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid item xs={1} container justify="center">
                        <Typography className={classes.cartItemPrice}>
                            ${productItem.price * itemInCart.qty}
                        </Typography>
                    </Grid>

                    <Grid item xs={1} container justify="center">
                        <IconButton
                            variant="outlined"
                            color="secondary"
                            value={itemInCart.id}
                            onClick={handleRemove}
                            className={classes.secondaryIconButton}
                        >
                            <CloseIcon color="error" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default CartItem
