import React from "react";

import { useCurtainContext } from "../../config/CurtainCoContext";
import { ACTIONS } from "../../config/stateReducer";

import { Redirect } from "react-router-dom";

import Container from "@material-ui/core/Container";
// import useStyles from "../reusable/UserDataFormStyles";

import { registerUser, loginUser } from "../../services/authServices";
import Copyright from "./Copyright";
import { UserDataForm } from "../export";

export default function SignUp() {
    // const classes = useStyles();

    const { state, dispatch } = useCurtainContext();

    function handleRegister(userDetails) {
        let registerError = false;
        // REGISTER THE USER
        registerUser(userDetails)
            .then((regResp) => {
                if (regResp.status === 201) {
                    dispatch({
                        type: ACTIONS.REGISTER,
                        payload: {
                            email: userDetails.email,
                            password: userDetails.password,
                            name:
                                userDetails.firstName +
                                "," +
                                userDetails.lastName,
                        },
                    });
                }
            })
            .then(() => {
                let { email, password } = userDetails;
                console.log(`destructured userDetails: ${email} ${password}`);
                // AFTER THE USER HAS BEEN CREATED LOG THE USER IN
                loginUser({ email, password })
                    .then((logResp) => {
                        let currentUser = logResp.data.user;

                        if (currentUser && logResp.status === 200) {
                            dispatch({
                                type: ACTIONS.LOGIN,
                                payload: currentUser,
                            });
                        } else {
                            registerError = `didn't get the user returned when signing up`;
                            console.log(registerError);
                        }
                    })
                    .catch((error) => {
                        registerError = `An error ocurred on login: ${error}.`;
                        console.log(registerError);
                    });
            })

            .catch((error) => {
                registerError = `An error ocurred on register: ${error}.`;
                console.log(registerError);
            });

        return registerError;
    }

    return (
        <>
            {state.loggedIn ? (
                <Redirect to="/" />
            ) : (
                <>
                    <UserDataForm
                        user={state.currentUser}
                        handleFunctionFromParent={handleRegister}
                        formTitle={"Sign Up"}
                    />
                    <Container maxWidth="sm">
                        <Copyright />
                    </Container>
                </>
            )}
        </>
    );
}
