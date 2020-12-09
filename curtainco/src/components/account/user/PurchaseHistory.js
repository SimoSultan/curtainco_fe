import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useStyles from './UserDashboardStyles'

function PurchaseHistory() {
    const classes = useStyles()

    return (
        <Container>
            <Typography variant="h5" className={classes.heading}>
                Purchase History
            </Typography>
        </Container>
    )
}

export default PurchaseHistory
