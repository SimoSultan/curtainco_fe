import React from "react"
import { Grid, Typography } from "@material-ui/core"

function PaymentSummary({ data }) {
    const { customer } = data

    const orders = data.items.map((order, i) => (
        // items does not have ids so created a CurtainCo00 id
        <Typography key={`CC00${i}`}>
            {`${order.qty} x ${order.name}`}
        </Typography>
    ))
    return (
        <Grid container>
            <Grid
                item
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                xs={7}
                spacing={1}
            >
                <Grid item>
                    <Typography variant="h3" component="h3">
                        {data._id}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>{`Recipient: ${customer.fullName}`}</Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        {/* TODO - consider changing to Paypal Input Address instead? */}
                        {`Deliver To: ${customer.address1}, ${customer.suburb}, ${customer.state} ${customer.postcode}`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        {`Shipped: ${data.isProcessed ? "Yes" : "No"}`}
                    </Typography>
                </Grid>
                <Grid item container justify="space-between">
                    <Grid item>
                        <Typography>Customer Orders:</Typography>
                    </Grid>
                    <Grid item>{orders}</Grid>
                </Grid>
                <Grid item>
                    <Typography>{`Total Cost: $${data.totalPrice}`}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PaymentSummary
