import React from "react"
import { Grid, Avatar, Divider, Box } from "@material-ui/core"
import { capitalize } from "../../../helpers/appHelpers"

function PurchasedProduct({ qty, product }) {
    return (
        <Box m={1}>
            <Grid item container justify="center" alignItems="center">
                <Grid item container direction="column" justify="center" xs={2}>
                    <Grid item>{qty}x</Grid>
                    <Grid item>Sub: ${qty * product.price}</Grid>
                </Grid>
                <Grid item container justify="flex-start" xs={2}>
                    <Grid item>
                        <Avatar src={product.imgUrl} alt={product.name} />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    xs={4}
                >
                    <Grid item>{product.category}</Grid>
                    <Grid item>{`${capitalize(product.colour)}`}</Grid>
                </Grid>
                <Grid
                    item
                    container
                    justify="flex-start"
                    alignItems="center"
                    xs={3}
                >
                    <Grid item>{capitalize(product.name)}</Grid>
                </Grid>
            </Grid>
            <Box mt={1}>
                <Divider />
            </Box>
        </Box>
    )
}

export default PurchasedProduct
