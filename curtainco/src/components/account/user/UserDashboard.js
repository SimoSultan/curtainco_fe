import React from 'react'


import ProfileInformation from './ProfileInformation'
import PurchaseHistory from './PurchaseHistory'
import CTARequestConsultation from './CTARequestConsultation'


import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

function UserDashboard() {
    return (
        <Container>

            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={6}>
                    <ProfileInformation />
                </Grid>
                <Grid item xs={6}>
                    <PurchaseHistory />
                </Grid>
            </Grid>
            <CTARequestConsultation />
        </Container>
    )
}

export default UserDashboard
