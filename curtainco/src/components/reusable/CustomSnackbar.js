import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function CustomSnackbar() {
    const { state, dispatch } = useCurtainContext()

    // <Alert severity="error">This is an error message!</Alert>
    // <Alert severity="warning">This is a warning message!</Alert>
    // <Alert severity="info">This is an information message!</Alert>
    // <Alert severity="success">This is a success message!</Alert>

    const handleClose = () => {
        dispatch({
            type: ACTIONS.SET_SNACKBAR,
            payload: {
                open: false,
                severity: "success",
                message: "",
            },
        })
    }

    return (
        <>
            <Snackbar
                open={state.snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={state.snackbar.severity}>
                    {state.snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}
