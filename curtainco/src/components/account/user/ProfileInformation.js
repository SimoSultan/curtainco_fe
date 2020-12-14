import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStyles from "./UserDashboardStyles";

import { useCurtainContext } from "../../../config/CurtainCoContext";
import { splitFullName } from "../../../helpers/userHelpers";
import { UserDataForm } from "../../export";

const ShowUserInformation = ({ user }) => {
    return (
        <Grid container direction="column">
            <Grid item>{user.title}</Grid>
            <Grid item>{user.email}</Grid>
            <Grid item>{user.address}</Grid>
            <Grid item>{user.phone}</Grid>
            <Grid item>{user.companyName}</Grid>
        </Grid>
    );
};

const EditUserInformation = ({ user, handleUpdate }) => {
    return (
        <UserDataForm
            user={user}
            formTitle={"Edit Information"}
            handleFunctionFromParent={handleUpdate}
            withAuth={false}
            buttonText={"Save"}
        />
    );
};

function ProfileInformation() {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    const [editUser, setEditUser] = useState(false);

    let user = {
        firstName: "",
        lastName: "",
        address: "",
    };

    if (state.currentUser) {
        user = state.currentUser;
        user.address = `${user.address1}, ${user.suburb}, ${user.state}, ${user.postcode}`;
        user.firstName = splitFullName(user.fullName)[0];
        user.lastName = splitFullName(user.fullName)[1];
    }

    function toggleEditUserForm() {
        setEditUser(!editUser);
    }

    function handleUpdate() {
        alert("hello");
    }

    return (
        <Container>
            <Typography variant="h5" className={classes.heading}>
                {`${user.firstName} ${user.lastName}`}
            </Typography>

            {editUser ? (
                <EditUserInformation
                    user={state.currentUser}
                    handleUpdate={handleUpdate}
                />
            ) : (
                <ShowUserInformation user={user} />
            )}

            <Button
                variant="outlined"
                color="primary"
                onClick={toggleEditUserForm}
            >
                Edit Information
            </Button>
        </Container>
    );
}

export default ProfileInformation;
