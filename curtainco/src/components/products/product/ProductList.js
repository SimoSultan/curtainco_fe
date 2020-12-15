import React from "react";
import { Grid } from "@material-ui/core";
import ProductItem from "./ProductItem";

function ProductList({
    products,
    filterText,
    filterTypes,
    filterSortBy,
    inStockOnly,
}) {
    let filteredProducts = products;

    // filter by search input

    // filteredProducts = filteredProducts.filter(
    //     (element) =>
    //         element.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    // );

    // filter by types
    // filteredProducts = filteredProducts.filter((element) =>
    //     filterTypes.includes(element.type)
    // );

    // filter by inStockOnly
    // filteredProducts = filteredProducts.filter(element => filterTypes.includes(element.type))

    // sort by
    if (filterSortBy === "az") {
        console.log("here");
        filteredProducts.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
    } else {
        console.log("her2");
        filteredProducts.sort((a, b) =>
            b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
    }

    console.log(filteredProducts);

    const list = filteredProducts.map((item, index) => (
        <Grid item key={`product-${index}`} xs={12} sm={6} md={4}>
            <ProductItem productData={item} />
        </Grid>
    ));

    return list;
}

export default ProductList;
