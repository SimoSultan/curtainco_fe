import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";

import { useCurtainContext } from "../../config/CurtainCoContext";
import { ACTIONS } from "../../config/stateReducer";
import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import PaymentSummary from "./PaymentSummary";
import { addItemToCart } from "../../services/cartServices";

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
        width: "50%",
        maxWidth: "700px",
        minWidth: "500px",
    },
    closeButton: {
        position: "absolute",
        top: "-7%",
        right: "-7%",
    },
    closeButtonCont: {
        position: "relative",
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
                paymentSummary: false
            },
        });
    };

    function handleCartClick(event) {
        event.preventDefault();
        addItemToCart(state.modal.data, dispatch);
    }

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
                    {state.modal.paymentSummary
                        ?
                        <PaymentSummary data={state.modal.data} />
                        :
                        <Grid container>
                            <Grid
                                item
                                container
                                xs={5}
                                justify="center"
                                alignItems="center"
                            >
                                <div role="img">
                                    <img
                                        src={
                                            state.modal.data.imgUrl === ""
                                                ? "https://source.unsplash.com/random"
                                                : state.modal.data.imgUrl
                                        }
                                        alt={state.modal.data.name}
                                        style={{ width: "70%" }}
                                    />
                                </div>
                            </Grid>
                            <Grid
                                item
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                                xs={7}
                                spacing={1}
                            >
                                <Grid item>
                                    <Typography variant="h3" component="h3">
                                        {state.modal.title}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{state.modal.message}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        Category: {state.modal.data.category}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        Price: ${state.modal.data.price}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    justify="flex-end"
                                    alignItems="center"
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleCartClick}
                                    >
                                        Add To Cart
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </div>
            </Fade>
        </Modal>
    );
}
