import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import CloseIcon from "@material-ui/icons/Close"

import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"
import { Grid, Typography, IconButton } from "@material-ui/core"
import PaymentSummaryModal from "./PaymentSummaryModal"
import OrderSummaryModal from "./OrderSummaryModal"
import { addItemToCart } from "../../services/cartServices"
import AddToCartButton from "./AddToCartButton"
import useStyles from "./ModalStyles"

export default function CustomModal() {
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()

    const handleClose = () => {
        dispatch({
            type: ACTIONS.SET_MODAL,
            payload: {
                open: false,
                title: "",
                message: "",
                data: {},
                paymentSummary: false,
                orderSummary: false,
            },
        })
    }

    function handleCartClick(event) {
        event.preventDefault()
        addItemToCart(state.modal.data)
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
                    {state.modal.paymentSummary ? (
                        <PaymentSummaryModal data={state.modal.data} />
                    ) : state.modal.orderSummary ? (
                        <OrderSummaryModal
                            data={state.modal.data}
                            handleClose={handleClose}
                        />
                    ) : (
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
                                <Grid
                                    item
                                    container
                                    justify="space-between"
                                    className={classes.closeButtonCont}
                                >
                                    <Grid item xs={9}>
                                        <Typography variant="h3" component="h3">
                                            {state.modal.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IconButton
                                            onClick={handleClose}
                                            className={classes.closeButton}
                                        >
                                            <CloseIcon color="error" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        {state.modal.message}
                                    </Typography>
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
                                    <AddToCartButton
                                        icon={false}
                                        text={"Add To Cart"}
                                        handleClick={handleCartClick}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </div>
            </Fade>
        </Modal>
    )
}
