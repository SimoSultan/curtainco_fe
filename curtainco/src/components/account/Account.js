import React from "react";

import { useCurtainContext } from "../../config/CurtainCoContext";

import Typography from "@material-ui/core/Typography";

import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import { Redirect } from "react-router-dom";

function Account() {
    const { state } = useCurtainContext();

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
    );
}

export default Account;
