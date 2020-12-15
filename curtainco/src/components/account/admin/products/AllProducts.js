import React, { useEffect } from "react";

import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Title from "../../../reusable/Title";

import useStyles from "../AdminStyles";
import { getAllProducts } from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";

function preventDefault(event) {
    event.preventDefault();
    alert("does nothing yet");
}

export default function AllProducts() {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    let allProducts = state.products;

    useEffect(() => {
        getAllProducts()
            .then((resp) => {
                if (resp.status === 200) {
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

    const productItems = allProducts.map((prod) => (
        <TableRow key={prod.name}>
            <TableCell>{prod.name}</TableCell>
            <TableCell>{prod.colour}</TableCell>
        </TableRow>
    ));

    return (
        <Paper className={classes.paper}>
            <Title>Products</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Colour</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{productItems}</TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more products
                </Link>
            </div>
        </Paper>
    );
}
