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

import { splitFullName } from "../../../../helpers/userHelpers";
import { getAllConsultations } from "../../../../services/consultationServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";

function preventDefault(event) {
    event.preventDefault();
    alert("does nothing");
}

export default function AllConsults() {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    let allConsults = state.consults;

    useEffect(() => {
        getAllConsultations()
            .then((resp) => {
                if (resp.status === 200) {
                    console.log("---CONSULTATIONS---");
                    console.log(resp.data);
                    dispatch({
                        type: ACTIONS.SET_ALL_CONSULTATIONS,
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

    // REMOVE ADMIN ROLE FROM LIST

    const userRow = allConsults.map((req) => (
        <TableRow key={req._id}>
            <TableCell>{`${splitFullName(req.fullName)[0]} ${
                splitFullName(req.fullName)[1]
            }`}</TableCell>
            <TableCell>{req.email}</TableCell>
            <TableCell>{req.phone}</TableCell>
            <TableCell>{`${req.suburb}, ${req.state}`}</TableCell>
        </TableRow>
    ));

    return (
        <Paper className={classes.paper}>
            <Title>All Consultations</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{userRow}</TableBody>
            </Table>
        </Paper>
    );
}
