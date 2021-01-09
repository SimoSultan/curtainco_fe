import React, { useState, useEffect } from "react"
// HELPERS AND SERVICES
import { useCurtainContext } from "../../../config/CurtainCoContext"
import {
    calculateCustomizedCollectionPrice,
    getOneCollectionFromState,
} from "../../../helpers/collectionHelpers"
import { getOneCollection } from "../../../services/collectionServices"
import { capitalize } from "../../../helpers/appHelpers"
import { addItemToCart } from "../../../services/cartServices"
import { ACTIONS } from "../../../config/stateReducer"
// STYLES
import useStyles from "../CollectionStyles"
import { Box, Container, Grid, Typography } from "@material-ui/core"
// COMPONENTS
import CustomAccordion from "../../reusable/CustomAccordion"
import CollectionIncludes from "./CollectionIncludes"
import AddToCartButton from "../../reusable/AddToCartButton"

function CollectionCustomise() {
    let collectionId = window.location.pathname.split("/customise/")[1]
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()
    const [customizedPrice, setCustomizedPrice] = useState(0)
    const [discount, setDiscount] = useState(
        state.discounts.mostProductsMultiplier
    )
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

    function handleCartClick(event) {
        event.preventDefault()
        let tempTrack = customizedCollection.track.filter(
            (element) => element !== false
        )
        let tempFabric = customizedCollection.fabric.filter(
            (element) => element !== false
        )
        let tempAccessory = customizedCollection.accessory.filter(
            (element) => element !== false
        )
        let tempCollection = {
            ...collection,
            track: tempTrack,
            fabric: tempFabric,
            accessory: tempAccessory,
            price: customizedPrice,
        }
        console.log(tempCollection)
        addItemToCart(tempCollection)
        dispatch({
            type: ACTIONS.SET_SNACKBAR,
            payload: {
                open: true,
                success: "success",
                message: "Added customised collection to cart",
            },
        })
    }

    // HANDLES THE TOTAL PRICE AND DISCOUNT OF THE CUSTOMISED COLLECTION
    useEffect(() => {
        console.log("---HERE----")
        let { customPrice, discount } = calculateCustomizedCollectionPrice(
            customizedCollection,
            collection,
            state.discounts
        )
        setCustomizedPrice(customPrice)
        setDiscount(discount)
    }, [customizedCollection, collection, state.discounts])

    // GETS THE COLLECTION FROM THE SERVER BASED ON THE ID IN THE URL
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
                        discount={discount}
                        price={customizedPrice}
                    />
                </Grid>
            </Grid>
            <Box p={3} mt={5} mr={10}>
                <Grid container justify="flex-end">
                    <AddToCartButton
                        icon={false}
                        text={"Add To Cart"}
                        size="large"
                        handleClick={handleCartClick}
                    />
                </Grid>
            </Box>
        </Container>
    )
}

export default CollectionCustomise
