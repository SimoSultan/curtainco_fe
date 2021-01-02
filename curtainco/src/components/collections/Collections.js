import React, { useEffect } from "react";

import { Container, Typography, Grid } from "@material-ui/core";

import useStyles from "./CollectionStyles";
import { useCurtainContext } from "../../config/CurtainCoContext";
import { ACTIONS } from "../../config/stateReducer";
import { getAllCollections } from "../../services/collectionServices";
import CollectionList from "./collection/CollectionList";

function Collections() {
    const classes = useStyles();

    const { state, dispatch } = useCurtainContext();
    const allCollections = state.collections;

    useEffect(() => {
        getAllCollections()
            .then((resp) => {
                if (resp.status === 200) {
                    console.log("---COLLECTIONS---");
                    console.log(resp.data);
                    dispatch({
                        type: ACTIONS.SET_ALL_COLLECTIONS,
                        payload: resp.data,
                    });
                } else {
                    console.log("status code wasn't correct");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dispatch]);

    return (
        <Container>
            <Typography variant="h3">Collections Page</Typography>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                spacing={10}
            >
                <CollectionList collections={state.collections} />
            </Grid>
        </Container>
    );
}

export default Collections;
