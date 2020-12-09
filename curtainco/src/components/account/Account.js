import React from 'react'

import { useCurtainContext } from '../../config/CurtainCoContext'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import AdminDashboard from './admin/AdminDashboard'
import UserDashboard from './user/UserDashboard'

function Account() {

    const { state, dispatch } = useCurtainContext()

    return (
        <Container>
            <Typography variant="h3">
                Account Page
            </Typography>

            { 
                state.currentUser !== null && state.currentUser.role === 'admin'
                ? <AdminDashboard />
                : <UserDashboard />
            }
        </Container>
    )
}

export default Account
