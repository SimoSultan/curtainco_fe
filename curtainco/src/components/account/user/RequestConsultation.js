import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import useStyles from './UserDashboardStyles'
import { Button } from '@material-ui/core'

function RequestConsultation() {
    const classes = useStyles()

    function handleRequest() {
        alert('to build this feature')
    }

    return (

        <Container className={classes.textCenter}>
            <Typography variant="h4" className={classes.heading}>
                Ready To Get Started?
            </Typography>
            <Typography variant="body1">Lorem ipsum dolor sit amet consectetur  adipisicing elit. Laboriosam odit illo nemo eum, temporibus culpa dolorem adipisci ratione provident enim possimus vero consequuntur sapiente libero ea. Quo vitae vel perspiciatis.</Typography>
            <Button variant="outlined" color="primary" onClick={handleRequest}>
                Request Consultation
            </Button>
            
        </Container>
    )
}

export default RequestConsultation