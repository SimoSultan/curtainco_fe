import React from "react"
import { Grid } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"

function LoadingSymbol() {
    return (
        <Grid
            item
            xs
            container
            justify="center"
            alignItems="center"
            style={{ height: "100%" }}
        >
            <CircularProgress />
        </Grid>
    )
}

export default LoadingSymbol
