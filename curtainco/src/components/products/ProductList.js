import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import ProductItem from "./ProductItem";

function ProductList({ products }) {
    const list = products.map((item, index) => (
        <Grid item key={`product-${index}`} xs={12} sm={6} md={4}>
            <ProductItem productData={item} />
        </Grid>
    ));

    return list;
}

export default ProductList;
