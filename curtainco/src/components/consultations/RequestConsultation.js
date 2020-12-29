import React, { useState } from "react";

import { useCurtainContext } from "../../config/CurtainCoContext";
import { ACTIONS } from "../../config/stateReducer";
// import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./ConsultationStyles";

import { submitConsultationRequest } from "../../services/consultationServices";
import Copyright from "../authentication/Copyright";
import UserDataForm from "../reusable/UserDataForm";

export default function SignUp() {
    const classes = useStyles();

    const { state, dispatch } = useCurtainContext();
    const [message, setMessage] = useState({ message: "" });
    const [request, setRequest] = useState({});

    function handleSubmitRequest(userDetails) {
        setRequest({ ...userDetails, ...message });

        submitConsultationRequest(request)
            .then((resp) => {
                if (resp.status === 201) {
                    dispatch({
                        type: ACTIONS.ADD_CONSULTATION,
                        payload: request,
                    });
                } else {
                }
                console.log(resp);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleMessageChange(e) {
        setMessage({ message: e.target.value });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h2" variant="h3">
                    Send a Request
                </Typography>

                <UserDataForm
                    user={state.currentUser}
                    formTitle={""}
                    handleFunctionFromParent={handleSubmitRequest}
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
        </Container>
    );
}
