import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import useStyles from './UserDashboardStyles'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function CTARequestConsultation() {
    const classes = useStyles()

    return (

        <Container className={classes.textCenter}>
            <Typography variant="h4" className={classes.heading}>
                Ready To Get Started?
            </Typography>
            <Typography variant="body1">Lorem ipsum dolor sit amet consectetur  adipisicing elit. Laboriosam odit illo nemo eum, temporibus culpa dolorem adipisci ratione provident enim possimus vero consequuntur sapiente libero ea. Quo vitae vel perspiciatis.</Typography>
            <Button variant="outlined" color="primary" >
                <Link to="/request" className={classes.link}>
                    Request Consultation
                </Link>
            </Button>
            
        </Container>
    )
}

export default CTARequestConsultation