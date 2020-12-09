import React from 'react'

// global state
// import { useCurtainContext } from '../config/CurtainCoContext'

// material ui
import {
    Container,
    Typography
} from '@material-ui/core'




function Home() {

    // const { state, dispatch } = useCurtainContext()


    return (
        <Container>
            <Typography variant="h3">
                Home Page
            </Typography>
            {/* <Typography variant="body1">
                {
                    `Hello ${state.currentUser !== null ? state.currentUser.fullName : "not logged in"}`
                }
            </Typography> */}
        </Container>
    )
}

export default Home
