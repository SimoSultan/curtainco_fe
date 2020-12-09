import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import useStyles from './UserDashboardStyles'

function RequestConsultation() {
    const classes = useStyles()
    return (
        <Container>
            <Typography variant="h4" className={classes.heading}>
                CTA for requesting a consultation
            </Typography>
        </Container>
    )
}

export default RequestConsultation