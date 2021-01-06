import React, { useEffect } from "react"

import Checkbox from "@material-ui/core/Checkbox"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Title from "../../../reusable/Title"

import useStyles from "../AdminStyles"
import {
    getFirstNameFromFullName,
    getLastNameFromFullName,
} from "../../../../helpers/userHelpers"
import { displayShortDate } from "../../../../helpers/appHelpers"
import { useCurtainContext } from "../../../../config/CurtainCoContext"
import { ACTIONS } from "../../../../config/stateReducer"
import {
    getAllOrders,
    markOrderProcessed,
} from "../../../../services/orderServices"

function AllOrders() {
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()
    let allOrders = state.orders

    useEffect(() => {
        getAllOrders()
            .then((resp) => {
                console.log("---ORDERS---")
                console.log(resp.data)
                dispatch({
                    type: ACTIONS.SET_ALL_ORDERS,
                    payload: resp.data,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [dispatch])

    const orderRow = allOrders.map((ord) => (
        <TableRow key={ord._id} id={ord._id} hover>
            <TableCell>
                <Checkbox
                    color="primary"
                    checked={ord.isProcessed}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    // onClick={handleConsultationCheckbox}
                />
            </TableCell>
            <TableCell
                className={ord.isProcessed ? classes.checkboxSelected : ""}
            >
                {displayShortDate(ord.updatedAt)}
            </TableCell>
            <TableCell
                className={ord.isProcessed ? classes.checkboxSelected : ""}
            >
                {`${getFirstNameFromFullName(ord.customer.fullName)} 
                ${getLastNameFromFullName(ord.customer.fullName)}`}
            </TableCell>
            <TableCell
                className={ord.isProcessed ? classes.checkboxSelected : ""}
            >
                {ord.customer.email}
            </TableCell>
            <TableCell
                className={ord.isProcessed ? classes.checkboxSelected : ""}
            >
                {ord._id}
            </TableCell>
            <TableCell>
                <Button
                    variant="outlined"
                    color="primary"
                    // onClick={handleMessageButton}
                    value={`${ord.customer.fullName}`}
                >
                    View
                </Button>
            </TableCell>
        </TableRow>
    ))
    return (
        <Paper className={classes.paper}>
            <Title>All Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Done</TableCell>
                        <TableCell>Created On</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Payment ID</TableCell>
                        <TableCell>Order Summary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{orderRow}</TableBody>
            </Table>
        </Paper>
    )
}

export default AllOrders
