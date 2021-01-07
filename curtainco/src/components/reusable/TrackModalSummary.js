import React from "react"
import { Grid } from "@material-ui/core"

function TrackModalSummary({ product }) {
    return (
        <Grid container direction="column">
            <Grid item>Type: {product.type}</Grid>
            <Grid item>Single: {product.single}</Grid>
            <Grid item>Finial Style: {product.finialStyle}</Grid>
            <Grid item>Finial Colour: {product.finialColour}</Grid>
            <Grid item>Location: {product.location}</Grid>
        </Grid>
    )
}

export default TrackModalSummary
