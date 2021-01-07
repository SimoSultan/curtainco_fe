import React from "react"
import { Grid } from "@material-ui/core"

function AccessoryModalSummary({ product }) {
    return (
        <Grid container direction="column">
            <Grid item>Type: {product.type}</Grid>
        </Grid>
    )
}

export default AccessoryModalSummary
