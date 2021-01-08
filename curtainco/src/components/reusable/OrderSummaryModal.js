import React from "react"
import PurchasedItems from "../account/user/PurchasedItems"
import { Grid, IconButton, Typography, Box, Container } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import useStyles from "./ModalStyles"

function OrderSummaryModal({ data, handleClose }) {
    let order = { ...data }
    const classes = useStyles()

    const items = order.items.map((orderItem) => (
        <PurchasedItems
            key={`productId-${orderItem.id}`}
            orderItem={orderItem}
        />
    ))

    return (
        <Container>
            <Grid
                item
                container
                direction="column"
                className={classes.closeButtonCont}
            >
                <Grid item container justify="center">
                    <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        xs={10}
                    >
                        <Typography variant="h6" component="h6">
                            Order #: {order._id}
                        </Typography>
                    </Grid>
                    <Grid item container justify="center" xs={2}>
                        <IconButton
                            onClick={handleClose}
                            className={classes.closeButton}
                        >
                            <CloseIcon color="error" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container direction="column">
                    {items}
                </Grid>
            </Grid>
        </Container>
    )
}

export default OrderSummaryModal
