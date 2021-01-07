import React from "react"
import { Typography, Grid, Avatar, Button } from "@material-ui/core"
import { capitalize } from "../../../helpers/appHelpers"

function PurchasedProduct({ qty, product }) {
    return (
        <Grid item container justify="center" alignItems="center">
            <Grid item container justify="center" xs={2}>
                <Grid item>
                    <Avatar src={product.imgUrl} alt={product.name} />
                </Grid>
            </Grid>
            <Grid item container direction="column" xs={7}>
                <Grid item>{`${qty}x ${capitalize(product.name)}`}</Grid>
                <Grid item>{`${capitalize(product.colour)} ${
                    product.category
                }`}</Grid>
                <Grid item>${product.price}</Grid>
            </Grid>
            <Grid item container justify="center" alignItems="center" xs={3}>
                <Grid item></Grid>
            </Grid>
        </Grid>
    )
}

export default PurchasedProduct
