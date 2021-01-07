import React from "react"
import { Typography, Grid, Avatar, Divider, Box } from "@material-ui/core"
import { capitalize } from "../../../helpers/appHelpers"
import { buildContentString } from "../../../helpers/collectionHelpers"

function PurchasedCollection(qty, collection) {
    return (
        <Box m={1}>
            <Grid item container justify="center" alignItems="center">
                <Grid item container direction="column" justify="center" xs={1}>
                    <Grid item>{qty}x</Grid>
                    <Grid item>Sub: ${qty * collection.price}</Grid>
                </Grid>
                <Grid item container justify="center" xs={2}>
                    <Grid item>
                        <Avatar src={collection.imgUrl} alt={collection.name} />
                    </Grid>
                </Grid>
                <Grid item container direction="column" xs={6}>
                    <Grid item>Contents</Grid>
                    <Grid item>
                        {buildContentString(collection.track, "Track")}
                    </Grid>
                    <Grid item>
                        {buildContentString(collection.fabric, "Fabric")}
                    </Grid>
                    <Grid item>
                        {buildContentString(collection.accessory, "Accessory")}
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    justify="center"
                    alignItems="center"
                    xs={3}
                >
                    <Grid item>{capitalize(collection.name)}</Grid>
                </Grid>
            </Grid>
            <Divider />
        </Box>
    )
}

export default PurchasedCollection
