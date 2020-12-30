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

import {
    getFirstNameFromFullName,
    getLastNameFromFullName,
} from "../../../../helpers/userHelpers";
import { getAllUsers } from "../../../../services/adminServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";

function preventDefault(event) {
    event.preventDefault();
    alert("does nothing");
}

export default function AllUsers() {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    let allUsers = state.users;

    useEffect(() => {
        getAllUsers()
            .then((resp) => {
                if (resp.status === 200) {
                    console.log("---USERS---");
                    console.log(resp.data);
                    dispatch({
                        type: ACTIONS.SET_ALL_USERS,
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
    allUsers = allUsers.filter((user) => user.role !== "admin");

    const userRow = allUsers.map((user) => (
        <TableRow key={user._id}>
            <TableCell>{`${getFirstNameFromFullName(
                user.fullName
            )} ${getLastNameFromFullName(user.fullName)}`}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{`${user.suburb}, ${user.state}`}</TableCell>
        </TableRow>
    ));

    return (
        <Paper className={classes.paper}>
            <Title>All Users</Title>
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
