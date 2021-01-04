import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import ProductList from "./product/ProductList";
import Search from "./sidebar/Search";
import Filter from "./sidebar/Filter";
import Sort from "./sidebar/Sort";
import useStyles from "./ProductStyles";
import { useCurtainContext } from "../../config/CurtainCoContext";
import { ACTIONS } from "../../config/stateReducer";
import { sortACTIONS, sortProducts } from "../../helpers/productHelpers";
import { getAllProducts } from "../../services/productServices";

const sortFields = Object.values(sortACTIONS);

function Products() {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    const [sortBy, setSortBy] = useState(sortACTIONS.NAME_ALPHABETICAL);
    const [searchInput, setSearchInput] = useState("");
    const [filter, setFilter] = useState({
        fabric: false,
        track: false,
        accessory: false,
    });

    // HANDLE THE STATE CHANGE FOR FILTERING
    const handleFilterChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.checked });
    };

    // HANDLE THE STATE CHANGE FOR FILTERING
    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    useEffect(() => {
        getAllProducts()
            .then((resp) => {
                if (resp.status === 200) {
                    console.log("---PRODUCTS---");
                    console.log(resp.data);
                    let sortedProducts = sortProducts(
                        resp.data,
                        sortACTIONS.NAME_ALPHABETICAL
                    );
                    dispatch({
                        type: ACTIONS.SET_ALL_PRODUCTS,
                        payload: sortedProducts,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dispatch]);

    return (
        <>
            <Grid container className={classes.cardGrid}>
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
                        <Search
                            searchInput={searchInput}
                            handleChange={handleSearchInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <Sort
                            sortFields={sortFields}
                            sortBy={sortBy}
                            handleChange={handleSortByChange}
                        />
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
                            products={state.products}
                            filterText={searchInput}
                            filterTypes={filter}
                            filterSortBy={sortBy}
                            sortFields={sortFields}
                            inStockOnly={true}
                        />
                    </Grid>
                </Container>
            </Grid>
        </>
    );
}

export default Products;
