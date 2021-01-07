import React from "react"
import { Grid } from "@material-ui/core"

function FabricModalSummary({ product }) {
    return (
        <Grid container direction="column">
            <Grid item>Density: {product.density}</Grid>
            <Grid item>Style: {product.style}</Grid>
            <Grid item>Size: {product.size}</Grid>
            <Grid item>Length: {product.length}</Grid>
        </Grid>
    )
}

export default FabricModalSummary
