import React from 'react'

import { useCurtainContext } from '../../../config/CurtainCoContext'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import useStyles from './UserDashboardStyles'


function ProfileInformation() {
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()
    
    return (
        <Container>
            <Typography variant="h5" className={classes.heading}>
                Profile Information
            </Typography>
        </Container>
    )
}

export default ProfileInformation
