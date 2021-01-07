import React, { useState, useEffect } from "react"
import { Typography, Grid, Button } from "@material-ui/core"
import PurchasedItems from "./PurchasedItems"
import { displayShortDate } from "../../../helpers/appHelpers"
import useStyles from "./UserDashboardStyles"

function PurchaseOrder({ order }) {
    const classes = useStyles()
    const [contentStrings, setContentStrings] = useState({
        collection: "",
        fabric: "",
        track: "",
        accessory: "",
    })
    // USING THIS FOR THE IMAGE IN THE ORDER LIST
    const firstItemInOrder = order.items[0].item

    function handleItemClick(event) {
        event.preventDefault()
        console.log("open modal here for contents of order")
        console.log(order)
        // TODO send item to modal to display more info
    }

    const items = order.items.map((orderItem) => (
        <PurchasedItems
            key={`productId-${orderItem.id}`}
            orderItem={orderItem}
        />
    ))

    function buildContentString(array, category) {
        if (array.length >= 2) {
            return category === "Accessory"
                ? `${array.length} Accessories`
                : `${array.length} ${category}s`
        } else if (array.length === 1) {
            return `${array.length} ${category}`
        } else {
            return ""
        }
    }

    useEffect(() => {
        let collectionsArray = []
        let fabricsArray = []
        let tracksArray = []
        let accessoriesArray = []

        for (let i = 0; i < order.items.length; i++) {
            const element = order.items[i]
            switch (element.item.category) {
                case "Fabric":
                    fabricsArray.push(element)
                    break
                case "Tracks":
                    tracksArray.push(element)
                    break
                case "Accessory":
                    accessoriesArray.push(element)
                    break
                default:
                    collectionsArray.push(element)
                    break
            }
        }

        let collectionStr = buildContentString(collectionsArray, "Collection")
        let fabricStr = buildContentString(fabricsArray, "Fabric")
        let trackStr = buildContentString(tracksArray, "Track")
        let accessoryStr = buildContentString(accessoriesArray, "Accessory")
        // let str = `${collectionStr}${fabricStr}${trackStr}${accessoryStr}`

        let obj = {
            collection: collectionStr,
            fabric: fabricStr,
            track: trackStr,
            accessory: accessoryStr,
        }
        setContentStrings(obj)
    }, [order])

    return (
        <>
            {/* THIS IS THE CONTAINER FOR EACH INDIVIDUAL ORDER MADE BY A USER*/}

            <Grid container>
                <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    xs={3}
                >
                    <img
                        src={firstItemInOrder.imgUrl}
                        alt={firstItemInOrder.name}
                        className={classes.orderImg}
                    />
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    xs={4}
                >
                    <Grid item>
                        <Typography variant="h6" component="h6">
                            Details
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            Date: {displayShortDate(order.createdAt)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Cost: ${order.totalPrice}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            Status?{" "}
                            {order.isProcessed ? "Sent" : "Not yet sent"}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    xs={2}
                >
                    <Grid item>
                        <Typography variant="h6" component="h6">
                            Contents
                        </Typography>
                    </Grid>
                    <Grid item>{contentStrings.collection}</Grid>
                    <Grid item>{contentStrings.track}</Grid>
                    <Grid item>{contentStrings.fabric}</Grid>
                    <Grid item>{contentStrings.accessory}</Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs={3}
                    justify="flex-end"
                    alignItems="center"
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleItemClick}
                        value={order}
                    >
                        See More
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default PurchaseOrder
