import React, { useEffect } from "react";

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

export default function AllProducts({ fillEditProductPage, editProductId }) {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    let allProducts = state.products;

    useEffect(() => {
        getAllProducts()
            .then((resp) => {
                if (resp.status === 200) {
                    console.log("---PRODUCTS---");
                    console.log(resp.data);
                    dispatch({
                        type: ACTIONS.SET_ALL_PRODUCTS,
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

    let productItems = allProducts.map((prod) => (
        <TableRow
            key={prod._id}
            id={`${prod.category},${prod._id}`}
            className={classes.tableRowHover}
            hover
            selected={editProductId === prod._id}
            onClick={fillEditProductPage}
        >
            <TableCell>{prod.imgUrl}</TableCell>
            <TableCell>{prod.category}</TableCell>
            <TableCell>{prod.name}</TableCell>
            {/* <TableCell>{prod.colour}</TableCell> */}
            <TableCell>{prod.price}</TableCell>
        </TableRow>
    ));

    return (
        <Paper className={classes.paper}>
            {/* Products */}
            <Title>Products</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Name</TableCell>
                        {/* <TableCell>Colour</TableCell> */}
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{productItems}</TableBody>
            </Table>
        </Paper>
    );
}
