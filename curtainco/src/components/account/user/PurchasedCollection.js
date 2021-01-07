import React from "react"
import { Typography, Grid, Avatar } from "@material-ui/core"
import { capitalize, displayShortDate } from "../../../helpers/appHelpers"

function PurchasedCollection(qty, collection) {
    return (
        <Grid item container direction="row">
            <Grid item xs={3}>
                <Avatar src={collection.imgUrl} alt={collection.name} />
            </Grid>
            <Grid item container direction="column" xs={9}>
                <Grid item>{`${qty} ${capitalize(collection.name)}`}</Grid>
                <Grid item>{capitalize(collection.name)}</Grid>

                <Grid item>${collection.price}</Grid>
            </Grid>
        </Grid>
    )
}

export default PurchasedCollection
