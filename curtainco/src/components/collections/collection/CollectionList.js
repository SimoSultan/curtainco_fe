import React from "react";
import { Grid } from "@material-ui/core";
import CollectionItem from "../collection/CollectionItem";
import useStyles from "../CollectionStyles";

function CollectionList({ collections }) {
    const classes = useStyles();

    const collectionList = collections.map((item, index) => (
        <Grid
            item
            container
            justify="center"
            alignItems="center"
            key={`collection-${index}`}
            xs
            className={classes.collectionList}
        >
            <CollectionItem data={item} />
        </Grid>
    ));

    return collectionList;
}

export default CollectionList;
