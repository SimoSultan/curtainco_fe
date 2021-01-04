import React, { useState, useEffect } from "react";

import { useCurtainContext } from "../../config/CurtainCoContext";
import { ACTIONS } from "../../config/stateReducer";

import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "./ConsultationStyles";

import { submitConsultationRequest } from "../../services/consultationServices";
import Copyright from "../authentication/Copyright";
import UserDataForm from "../reusable/UserDataForm";
import { isEmpty } from "../../helpers/appHelpers";

export default function SignUp() {
    const classes = useStyles();

    const { state, dispatch } = useCurtainContext();
    const [message, setMessage] = useState({ message: "" });
    const [request, setRequest] = useState({});

    function getUserDetailsFromForm(userDetails) {
        delete userDetails.role;
        delete userDetails.password;
        delete userDetails.orders;
        setRequest({ ...message, ...userDetails });
    }

    useEffect(() => {
        console.log(isEmpty(request));
        console.log(request);
        if (!isEmpty(request)) {
            submitConsultationRequest(request)
                .then((resp) => {
                    console.log("---CONSULTATION---");
                    console.log(resp.data);
                    if (resp.status === 201) {
                        dispatch({
                            type: ACTIONS.ADD_CONSULTATION,
                            payload: request,
                        });
                        // clear the request state so that the useEffect doesn't fire again
                        setRequest({});
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log(
                "consultation request object is empty and submitting the request failed"
            );
        }
    }, [dispatch, request]);

    function handleMessageChange(e) {
        setMessage({ message: e.target.value });
    }

    return (
        <>
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h2" variant="h3">
                    Send a Request
                </Typography>

                <UserDataForm
                    currentUser={state.currentUser}
                    formTitle={""}
                    handleFunctionFromParent={getUserDetailsFromForm}
                    withAuth={false}
                    headerInformation={false}
                    buttonText={"Submit"}
                    withConsultMessage={{
                        msg: message.message,
                        handleFunction: handleMessageChange,
                    }}
                />
            </div>

            <Box mt={5}>
                <Copyright />
            </Box>
        </>
    );
}
