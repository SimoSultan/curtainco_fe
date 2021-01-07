import React, { useState, useEffect } from "react"
import PurchaseOrder from "./PurchaseOrder"
import { Container, Typography, Grid, Divider } from "@material-ui/core"
import useStyles from "./UserDashboardStyles"
import { getUserOrders } from "../../../services/userServices"
import { useCurtainContext } from "../../../config/CurtainCoContext"

function PurchaseHistory() {
    const classes = useStyles()
    const { state } = useCurtainContext()
    const [purchaseHistory, setPurchaseHistory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getPurchaseHistoryOfUser() {
            setLoading(true)
            const orderIds = state.currentUser.orders
            let ordersArray = []
            for (let i = 0; i < orderIds.length; i++) {
                try {
                    const id = orderIds[i]
                    let resp = await getUserOrders(id)
                    if (resp.status === 200) {
                        ordersArray.push(resp.data)
                    }
                } catch (error) {
                    console.log(
                        `Error getting order from ID: ${orderIds[i]}. ${error}`
                    )
                }
            }
            setPurchaseHistory(ordersArray)
            setLoading(false)
        }

        getPurchaseHistoryOfUser()
    }, [state.currentUser.orders])

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

            {loading ? (
                "loading..."
            ) : (
                <Grid
                    container
                    direction="column"
                    className={classes.purchaseHistoryRoot}
                >
                    {allPurchasedItems}
                </Grid>
            )}
        </Container>
    )
}

export default PurchaseHistory
