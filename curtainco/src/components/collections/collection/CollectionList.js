import React from "react";
import { Grid } from "@material-ui/core";
import CollectionItem from "../collection/CollectionItem";

function CollectionList({ collections }) {
    let filteredCollections = collections;

    // SORT THE PRODUCTS
    // filteredCollections = sortProducts(filteredCollections, filterSortBy);

    const collectionList = filteredCollections.map((item, index) => (
        <Grid
            item
            container
            justify="center"
            alignItems="center"
            key={`collection-${index}`}
            xs
            style={{ width: "80%" }}
        >
            <CollectionItem data={item} />
        </Grid>
    ));

    return collectionList;
}

export default CollectionList;
