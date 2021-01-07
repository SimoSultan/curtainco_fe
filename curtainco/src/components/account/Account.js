import React, { useEffect } from "react"
import { useCurtainContext } from "../../config/CurtainCoContext"
import Typography from "@material-ui/core/Typography"
import AdminDashboard from "./admin/AdminDashboard"
import UserDashboard from "./user/UserDashboard"
import { Redirect } from "react-router-dom"

function Account() {
    const { state, dispatch } = useCurtainContext()

    // useEffect(() => {
    //     async function getUserFromDb() {
    //         try {
    //             const resp = getUser(state.currentUser._id)
    //             console.log(resp)
    //             return resp
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     let user = getUserFromDb()
    //     console.log(user)
    // }, [state.currentUser._id])

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
