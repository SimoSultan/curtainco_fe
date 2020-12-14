import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import ProductList from "./product/ProductList";
import useStyles from "./product/ProductStyles";

const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Products() {
    const classes = useStyles();

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                <ProductList products={products} />
            </Grid>
        </Container>
    );
}

export default Products;
