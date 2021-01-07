import React, { useEffect } from "react"

import Table from "@material-ui/core/Table"
import TableContainer from "@material-ui/core/TableContainer"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import { getAllCollections } from "../../../../services/collectionServices"
import { useCurtainContext } from "../../../../config/CurtainCoContext"
import Title from "../../../reusable/Title"
import { ACTIONS } from "../../../../config/stateReducer"
import { sortACTIONS, sortProducts } from "../../../../helpers/productHelpers"

import useStyles from "../AdminStyles"

export default function AllCollections({
    fillEditCollectionPage,
    editCollectionId,
}) {
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()

    useEffect(() => {
        getAllCollections()
            .then((resp) => {
                if (resp.status === 200) {
                    console.log("---COLLECTIONS---")
                    console.log(resp.data)
                    // sortProducts can be used here as it is just looking
                    // at the object.name attribute
                    let sortedCollections = sortProducts(
                        resp.data,
                        sortACTIONS.NAME_ALPHABETICAL
                    )
                    dispatch({
                        type: ACTIONS.SET_ALL_COLLECTIONS,
                        payload: sortedCollections,
                    })
                } else {
                    console.log("status code wasn't correct")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [dispatch])

    let collectionItems = state.collections.map((coll) => (
        <TableRow
            key={coll._id}
            id={coll._id}
            className={classes.tableRowHover}
            hover
            selected={editCollectionId === coll._id}
            onClick={fillEditCollectionPage}
        >
            <TableCell>{coll.name}</TableCell>
            <TableCell>${coll.price}</TableCell>
        </TableRow>
    ))

    return (
        <Paper className={classes.paper}>
            <Title>Collections</Title>
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{collectionItems}</TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
