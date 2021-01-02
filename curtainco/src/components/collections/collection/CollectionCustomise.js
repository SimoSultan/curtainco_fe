import React, { useState, useEffect } from "react";
import { useCurtainContext } from "../../../config/CurtainCoContext";
import { getOneCollectionFromState } from "../../../helpers/collectionHelpers";
import { getOneCollection } from "../../../services/collectionServices";
import useStyles from "../CollectionStyles";

import { Container, Grid, Typography } from "@material-ui/core";

function CollectionCustomise() {
    const classes = useStyles();
    const [collection, setCollection] = useState({});
    const { state } = useCurtainContext();
    let collectionId = window.location.pathname.split("/customise/")[1];

    useEffect(() => {
        let resp = {};
        if (state.collections.length < 1) {
            console.log("getting the collection from db");
            getOneCollection(collectionId)
                .then((resp) => {
                    console.log(resp);
                    setCollection(resp.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("getting the collection from state");
            resp = getOneCollectionFromState(state.collections, collectionId);
        }
        setCollection(resp);
    }, [state.collections, collectionId]);

    return (
        <Container maxWidth>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <Typography variant="h3" component="h3">
                        {collection.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>{collection.description}</Typography>
                </Grid>

                <Grid item>
                    <Typography>Fabric: {collection.fabric.name}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Track: {collection.track.name}</Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        Accessory: {collection.accessory.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>${collection.price}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CollectionCustomise;
