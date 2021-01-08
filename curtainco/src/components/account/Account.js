import React, { useState, useEffect } from "react"
import { useCurtainContext } from "../../config/CurtainCoContext"
import Typography from "@material-ui/core/Typography"
import AdminDashboard from "./admin/AdminDashboard"
import UserDashboard from "./user/UserDashboard"
import { Redirect } from "react-router-dom"
import { ACTIONS } from "../../config/stateReducer"
import { getUpdatedUserWithOrderObjects } from "../../services/userServices"

function Account() {
    const { state, dispatch } = useCurtainContext()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getUpdatedUserFromDb() {
            try {
                const resp = await getUpdatedUserWithOrderObjects(
                    state.currentUser._id
                )
                console.log(resp)
                let currentUser = resp.data
                if (resp.status === 200 && currentUser) {
                    dispatch({
                        type: ACTIONS.SET_CURRENT_USER,
                        payload: currentUser,
                    })
                }
            } catch (error) {
                console.log(
                    `An error ocurred on getUpdatedUserWithOrderObjects at Account: ${error}.`
                )
                // IF AN ERROR OCCURS, LOOK FOR FALSE IN PURCHASE HISTORY AND SHOW ERROR
                dispatch({
                    type: ACTIONS.SET_CURRENT_USER,
                    payload: { ...state.currentUser, orders: false },
                })
            }
            setIsLoading(false)
        }

        if (isLoading) {
            getUpdatedUserFromDb()
        }
    }, [state.currentUser, dispatch, isLoading])

    return (
        <>
            <Typography variant="h3">Account Page</Typography>

            {state.currentUser !== null ? (
                state.currentUser.role === "admin" ? (
                    <AdminDashboard />
                ) : (
                    <UserDashboard isLoading={isLoading} />
                )
            ) : (
                <Redirect to="/" />
            )}
        </>
    )
}

export default Account
