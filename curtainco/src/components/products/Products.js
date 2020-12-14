import React from "react";
import { Container, Grid } from "@material-ui/core";
import ProductList from "./product/ProductList";
import Search from "./sidebar/Search";
import Filter from "./sidebar/Filter";
import Sort from "./sidebar/Sort";
import useStyles from "./ProductStyles";

const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Products() {
    const classes = useStyles();

    return (
        <Container className={classes.cardGrid}>
            <Grid container>
                <Grid
                    item
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    xs={2}
                    spacing={1}
                >
                    <Grid item>
                        <Search />
                    </Grid>
                    <Grid item>
                        <Sort />
                    </Grid>
                    <Grid item>
                        <Filter />
                    </Grid>
                </Grid>

                <Container maxWidth="md">
                    <Grid
                        item
                        container
                        spacing={4}
                        xs={10}
                        justify="center"
                        alignItems="center"
                    >
                        <ProductList products={products} />
                    </Grid>
                </Container>
            </Grid>
        </Container>
    );
}

export default Products;
