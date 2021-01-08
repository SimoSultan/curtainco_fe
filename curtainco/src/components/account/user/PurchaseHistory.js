import React, { useState, useEffect } from "react"
import PurchaseOrder from "./PurchaseOrder"
import { Container, Typography, Grid, Divider } from "@material-ui/core"
import useStyles from "./UserDashboardStyles"
import { getUpdatedUserWithOrderObjects } from "../../../services/userServices"
import { useCurtainContext } from "../../../config/CurtainCoContext"

function PurchaseHistory() {
    const classes = useStyles()
    const { state } = useCurtainContext()
    const [purchaseHistory, setPurchaseHistory] = useState([])

    useEffect(() => {
        setPurchaseHistory(state.currentUser.orders)
    }, [state.currentUser])

    const allPurchasedItems = purchaseHistory.map((order) => (
        <Grid item xs key={order._id}>
            <PurchaseOrder order={order} />
            <Divider />
        </Grid>
    ))

    return (
        <Container>
            <Typography variant="h5" className={classes.heading}>
                Purchase History
            </Typography>

            <Grid
                container
                direction="column"
                className={classes.purchaseHistoryRoot}
            >
                {allPurchasedItems}
            </Grid>
        </Container>
    )
}

export default PurchaseHistory
