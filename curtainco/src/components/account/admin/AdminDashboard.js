import React from 'react'

// ADMIN COMPONENTS
import AdminTabs from './AdminTabs'


// MAT UI
import {
    Container,
    Typography
} from '@material-ui/core'

function AdminDashboard() {
    return (
        <Container>
            <AdminTabs  />
            <Typography variant="h3">
                Admin Dashboard
            </Typography>
        </Container>
    )
}

export default AdminDashboard
