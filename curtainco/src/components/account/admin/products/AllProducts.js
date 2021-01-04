import React, { useEffect } from "react";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import useStyles from "../AdminStyles";
import { getAllProducts } from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import Title from "../../../reusable/Title";
import { ACTIONS } from "../../../../config/stateReducer";
import { sortACTIONS, sortProducts } from "../../../../helpers/productHelpers";

export default function AllProducts({ fillEditProductPage, editProductId }) {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();

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
                    sortedProducts = sortProducts(
                        resp.data,
                        sortACTIONS.CATEGORY
                    );
                    dispatch({
                        type: ACTIONS.SET_ALL_PRODUCTS,
                        payload: sortedProducts,
                    });
                } else {
                    console.log("status code wasn't correct");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dispatch]);

    let productItems = state.products.map((prod) => (
        <TableRow
            key={prod._id}
            id={`${prod.category},${prod._id}`}
            className={classes.tableRowHover}
            hover
            selected={editProductId === prod._id}
            onClick={fillEditProductPage}
        >
            <TableCell>{prod.category}</TableCell>
            <TableCell>{prod.name}</TableCell>
            <TableCell>${prod.price}</TableCell>
        </TableRow>
    ));

    return (
        <Paper className={classes.paper}>
            <Title>Products</Title>
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{productItems}</TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
