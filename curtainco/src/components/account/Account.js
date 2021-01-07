import React, { useEffect } from "react"
import { useCurtainContext } from "../../config/CurtainCoContext"
import Typography from "@material-ui/core/Typography"
import AdminDashboard from "./admin/AdminDashboard"
import UserDashboard from "./user/UserDashboard"
import { Redirect } from "react-router-dom"
import { getLoggedInUser } from "../../services/authServices"
import { ACTIONS } from "../../config/stateReducer"

function Account() {
    const { state, dispatch } = useCurtainContext()

    useEffect(() => {
        async function getUserFromDb() {
            try {
                const resp = await getLoggedInUser(state.currentUser._id)
                let currentUser = resp.data.user
                if (resp.status === 200 && currentUser) {
                    dispatch({
                        type: ACTIONS.SET_CURRENT_USER,
                        payload: currentUser,
                    })
                }
                return resp
            } catch (error) {
                console.log(
                    `An error ocurred on getLoggedInUser at Account: ${error}.`
                )
            }
        }

        getUserFromDb()
    }, [state.currentUser._id, dispatch])

    console.log(state.currentUser.orders)

    return (
        <>
            <Typography variant="h3">Account Page</Typography>

            {state.currentUser !== null ? (
                state.currentUser.role === "admin" ? (
                    <AdminDashboard />
                ) : (
                    <UserDashboard />
                )
            ) : (
                <Redirect to="/" />
            )}
        </>
    )
}

export default Account
