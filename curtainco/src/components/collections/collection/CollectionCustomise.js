import React, { useState, useEffect } from "react";
import { useCurtainContext } from "../../../config/CurtainCoContext";
import { getOneCollectionFromState } from "../../../helpers/collectionHelpers";
import { getOneCollection } from "../../../services/collectionServices";
import useStyles from "../CollectionStyles";

import { Container, Grid, Typography } from "@material-ui/core";
import CustomAccordion from "../../reusable/CustomAccordion";
import CollectionIncludes from "./CollectionIncludes";
import { capitalize } from "../../../helpers/appHelpers";

function CollectionCustomise() {
    const classes = useStyles();
    const [collection, setCollection] = useState({});
    const { state } = useCurtainContext();
    let collectionId = window.location.pathname.split("/customise/")[1];

    useEffect(() => {
        if (state.collections.length < 1) {
            console.log("getting the collection from db");
            getOneCollection(collectionId)
                .then((resp) => {
                    setCollection(resp.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("getting the collection from state");
            let resp = getOneCollectionFromState(
                state.collections,
                collectionId
            );
            setCollection(resp);
        }
    }, [state.collections, collectionId]);

    const dummyCollectionData = {
        fabric: [
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Fabric 1",
            },
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Fabric 2",
            },
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Fabric 3",
            },
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Fabric 4",
            },
        ],
        track: [
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Track 1",
            },
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Track 2",
            },
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Track 3",
            },
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Track 4",
            },
        ],
        accessory: [
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Accessory 1",
            },
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Accessory 2",
            },
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Accessory 3",
            },
            {
                imgUrl: "https://source.unsplash.com/random/900x600",
                name: "Accessory 4",
            },
        ],
    };

    return (
        <Container maxWidth>
            {/* <Grid
                container
                justify="center"
                alignItems="center"
                spacing={6}
                className={classes.collectionHeaderCont}
            >
                <Grid item container justify="center" xs={6}>
                    <img
                        src={
                            collection.imgUrl === ""
                                ? "https://source.unsplash.com/random/900x600"
                                : collection.imgUrl
                        }
                        alt={collection.name}
                        className={classes.collectionHeaderImage}
                    />
                </Grid> */}
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
            {/* </Grid> */}
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
                        data={dummyCollectionData.fabric}
                        tip="This is a fabric tip"
                    />
                    <CustomAccordion
                        summary="Step 2: Tracks"
                        data={dummyCollectionData.track}
                        tip="This is a track tip"
                    />
                    <CustomAccordion
                        summary="Step 3: Accessories"
                        data={dummyCollectionData.accessory}
                        tip="This is an accessory tip"
                    />
                </Grid>
                <Grid item xs={3}>
                    <CollectionIncludes
                        fabrics={dummyCollectionData.fabric}
                        tracks={dummyCollectionData.track}
                        accessories={dummyCollectionData.accessory}
                        price={100}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default CollectionCustomise;
