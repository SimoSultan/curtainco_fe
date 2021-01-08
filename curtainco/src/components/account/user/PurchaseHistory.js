import React, { useState, useEffect } from "react"
import PurchaseOrder from "./PurchaseOrder"
import { Container, Typography, Grid, Divider } from "@material-ui/core"
import useStyles from "./UserDashboardStyles"
import { getUpdatedUserWithOrderObjects } from "../../../services/userServices"
import { useCurtainContext } from "../../../config/CurtainCoContext"
import LoadingSymbol from "../../reusable/LoadingSymbol"

function PurchaseHistory() {
    const classes = useStyles()
    const { state } = useCurtainContext()
    const [purchaseHistory, setPurchaseHistory] = useState([])
    const [purchaseHistoryError, setPurchaseHistoryError] = useState(
        "No purchases have been made"
    )

    useEffect(() => {
        if (!state.currentUser.orders) {
            setPurchaseHistoryError(
                "There was an error fetching your purchase history"
            )
        }
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
                {allPurchasedItems.length === 0
                    ? purchaseHistoryError
                    : allPurchasedItems}
            </Grid>
        </Container>
    )
}

export default PurchaseHistory
