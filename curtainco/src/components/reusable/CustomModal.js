import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { useCurtainContext } from "../../config/CurtainCoContext";
import { ACTIONS } from "../../config/stateReducer";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CustomModal() {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();

    const handleClose = () => {
        dispatch({
            type: ACTIONS.SET_MODAL,
            payload: {
                open: false,
                title: "",
                message: "",
                data: {},
            },
        });
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={state.modal.open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={state.modal.open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">{state.modal.title}</h2>
                    <p id="transition-modal-description">
                        {state.modal.message}
                    </p>
                    <div>{`Data: ${state.modal.data}`}</div>
                </div>
            </Fade>
        </Modal>
    );
}
