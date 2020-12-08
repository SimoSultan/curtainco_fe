import React from 'react'

// global state
import { useCurtainContext } from '../../config/CurtainCoContext'

import {
    Container,
    Typography
} from '@material-ui/core'

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
        </Container>
    )
}

export default Account
