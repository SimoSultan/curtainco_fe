import React, { useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { getAllCollections } from "../../../../services/collectionServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import Title from "../../../reusable/Title";
import { ACTIONS } from "../../../../config/stateReducer";

import useStyles from "../AdminStyles";

export default function AllCollections({
    fillEditCollectionPage,
    editCollectionId,
}) {
    const classes = useStyles();

    const { state, dispatch } = useCurtainContext();
    let allCollections = state.collections;

    useEffect(() => {
        getAllCollections()
            .then((resp) => {
                if (resp.status === 200) {
                    console.log(resp.data);
                    dispatch({
                        type: ACTIONS.SET_ALL_COLLECTIONS,
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

    let collectionItems = allCollections.map((coll) => (
        <TableRow
            key={coll._id}
            id={coll._id}
            className={
                editCollectionId === coll._id
                    ? classes.tableRowSelected
                    : classes.tableRowHover
            }
            onClick={fillEditCollectionPage}
        >
            <TableCell>{coll.imgUrl}</TableCell>
            <TableCell>{coll.name}</TableCell>
            <TableCell align="right">{coll.price}</TableCell>
        </TableRow>
    ));

    return (
        <Paper className={classes.paper}>
            <Title>Collections</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{collectionItems}</TableBody>
            </Table>
        </Paper>
    );
}
