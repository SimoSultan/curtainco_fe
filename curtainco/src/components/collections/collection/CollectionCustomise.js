import React, { useState, useEffect } from "react"
import { useCurtainContext } from "../../../config/CurtainCoContext"
import { getOneCollectionFromState } from "../../../helpers/collectionHelpers"
import { getOneCollection } from "../../../services/collectionServices"
import useStyles from "../CollectionStyles"

import { Container, Grid, Typography } from "@material-ui/core"
import CustomAccordion from "../../reusable/CustomAccordion"
import CollectionIncludes from "./CollectionIncludes"
import { capitalize } from "../../../helpers/appHelpers"

function CollectionCustomise() {
    const classes = useStyles()
    let collectionId = window.location.pathname.split("/customise/")[1]
    const { state } = useCurtainContext()
    const [collection, setCollection] = useState({
        _id: "",
        name: "",
        description: "",
        imgUrl: "",
        price: "",
        track: [],
        fabric: [],
        accessory: [],
        trackTip: "",
        accessoryTip: "",
        fabricTip: "",
    })
    const [customizedCollection, setCustomizedCollection] = useState({
        track: [],
        fabric: [],
        accessory: [],
    })

    function handleUserCustomizingCollection(productArray, category) {
        setCustomizedCollection({
            ...customizedCollection,
            [category]: productArray,
        })
    }

    useEffect(() => {
        if (state.collections.length < 1) {
            console.log("getting the collection from db")
            getOneCollection(collectionId)
                .then((resp) => {
                    setCollection(resp.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            console.log("getting the collection from state")
            let resp = getOneCollectionFromState(
                state.collections,
                collectionId
            )
            setCollection(resp)
        }
    }, [state.collections, collectionId])

    useEffect(() => {
        setCustomizedCollection({
            track: collection.track,
            fabric: collection.fabric,
            accessory: collection.accessory,
        })
    }, [collection])

    return (
        <Container>
            <Grid
                item
                container
                justify="center"
                xs={12}
                className={classes.collectionHeaderCont}
            >
                <Typography variant="h4" component="h4">
                    {collection.name
                        ? capitalize(collection.name)
                        : "Not Found"}
                </Typography>
            </Grid>
            <Grid container justify="space-around">
                <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                    xs={9}
                >
                    <CustomAccordion
                        summary="Step 1: Fabrics"
                        data={collection.fabric}
                        tip={collection.fabricTip}
                        handleCustomization={handleUserCustomizingCollection}
                        open={true}
                    />
                    <CustomAccordion
                        summary="Step 2: Tracks"
                        data={collection.track}
                        tip={collection.trackTip}
                        handleCustomization={handleUserCustomizingCollection}
                        open={false}
                    />
                    <CustomAccordion
                        summary="Step 3: Accessories"
                        data={collection.accessory}
                        tip={collection.accessoryTip}
                        handleCustomization={handleUserCustomizingCollection}
                        open={false}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CollectionIncludes
                        fabrics={customizedCollection.fabric}
                        tracks={customizedCollection.track}
                        accessories={customizedCollection.accessory}
                        price={collection.price}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default CollectionCustomise
