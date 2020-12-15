import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import ProductList from "./product/ProductList";
import Search from "./sidebar/Search";
import Filter from "./sidebar/Filter";
import Sort from "./sidebar/Sort";
import useStyles from "./ProductStyles";
import { useCurtainContext } from "../../config/CurtainCoContext";
import { ACTIONS } from "../../config/stateReducer";

// Generate Order Data
function createData(id, name, type, amount) {
    return { id, name, type, amount };
}

const products = [
    createData(0, "Summer Fabric", "fabric", 312.44),
    createData(1, "Summer Rod", "rod", 866.99),
    createData(2, "Summer Accessory", "accessory", 100.81),
    createData(3, "Winter Fabric", "fabric", 99.44),
    createData(4, "Winter Rod", "rod", 453.99),
    createData(5, "Winter Accessory", "accessory", 90.81),
    createData(6, "Autumn Fabric", "fabric", 101.44),
    createData(7, "Autumn Rod", "rod", 632.99),
    createData(8, "Autumn Accessory", "accessory", 109.81),
];

function Products() {
    const classes = useStyles();
    const { dispatch } = useCurtainContext();
    const [filter, setFilter] = useState({
        fabric: false,
        rod: false,
        accessory: false,
        inStock: false,
    });

    // HANDLE THE STATE CHANGE FOR FILTERING
    const handleFilterChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.checked });
        alert("hello");
    };

    const { fabric, rod, accessory, inStock } = filter;
    const error =
        [fabric, rod, accessory, inStock].filter((v) => v).length !== 2;

    // SET THE GLOBAL STATE OF ALL THE PRODUCTS
    useEffect(() => {
        dispatch({
            type: ACTIONS.ADD_PRODUCTS,
            payload: products,
        });
    }, [dispatch]);

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
                        <Filter
                            state={filter}
                            handleChange={handleFilterChange}
                        />
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
                        <ProductList
                            products={products}
                            filterText={""}
                            filterTypes={[]}
                            filterSortBy={"az"}
                            inStockOnly={true}
                        />
                    </Grid>
                </Container>
            </Grid>
        </Container>
    );
}

export default Products;
