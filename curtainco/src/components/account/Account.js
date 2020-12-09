import React from 'react'

import { useCurtainContext } from '../../config/CurtainCoContext'

import {
    Container,
    Typography
} from '@material-ui/core'
import AdminDashboard from './admin/AdminDashboard'
import UserDashboard from './user/UserDashboard'

function Account() {

    const { state, dispatch } = useCurtainContext()

    return (
        <Container>
            <Typography variant="h3">
                Account Page
            </Typography>
            <Typography variant="h5">
                {
                    `Hello ${state.currentUser !== null ? state.currentUser.fullName : "not logged in"}`
                }
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
