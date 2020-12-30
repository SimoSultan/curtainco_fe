import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStyles from "./UserDashboardStyles";

import { useCurtainContext } from "../../../config/CurtainCoContext";
import { ACTIONS } from "../../../config/stateReducer";
import {
    getFirstNameFromFullName,
    getLastNameFromFullName,
} from "../../../helpers/userHelpers";
import { updateUserInformation } from "../../../services/userServices";
import ShowUserInformation from "./ShowUserInformation";
import EditUserInformation from "./EditUserInformation";

function ProfileInformation() {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    const [editUser, setEditUser] = useState(false);

    function toggleEditUserForm() {
        setEditUser(!editUser);
    }

    function handleUpdate(userDetails) {
        let updateError = false;
        let userId = state.currentUser._id;

        updateUserInformation(userDetails, userId)
            .then((resp) => {
                if (resp.status === 200) {
                    dispatch({
                        type: ACTIONS.SET_CURRENT_USER,
                        payload: resp.data,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            severity: "success",
                            message: "User successfully updated",
                        },
                    });
                }
            })
            .catch((error) => {
                updateError = `An error ocurred on register: Error Code: ${error.status}. Message: ${error.message}.`;
                console.log(updateError);
            });

        toggleEditUserForm();
        console.log("User successfully updated");
        return updateError;
    }

    return (
        <Container>
            <Typography variant="h5" className={classes.heading}>
                {`${getFirstNameFromFullName(
                    state.currentUser.fullName
                )} ${getLastNameFromFullName(state.currentUser.fullName)}`}
            </Typography>

            {editUser ? (
                <EditUserInformation
                    user={state.currentUser}
                    handleUpdate={handleUpdate}
                />
            ) : (
                <ShowUserInformation user={state.currentUser} />
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
