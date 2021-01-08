import React, { useState, useEffect } from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"

import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"
import PaymentSummaryModal from "./PaymentSummaryModal"
import OrderSummaryModal from "./OrderSummaryModal"
import ProductSummaryModal from "./ProductSummaryModal"
import { addItemToCart } from "../../services/cartServices"
import useStyles from "./ModalStyles"
import { isEmpty } from "../../helpers/appHelpers"

export default function CustomModal() {
    const classes = useStyles()
    const [dataIsPresent, setDataIsPresent] = useState(false)
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

    useEffect(() => {
        if (!isEmpty(state.modal.data)) {
            setDataIsPresent(true)
        }
    }, [state.modal.data])

    function handleCartClick(event) {
        event.preventDefault()
        addItemToCart(state.modal.data)
    }

    return (
        <>
            {dataIsPresent ? (
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
                                <ProductSummaryModal
                                    data={state.modal.data}
                                    title={state.modal.title}
                                    handleClose={handleClose}
                                    handleCartClick={handleCartClick}
                                />
                            )}
                        </div>
                    </Fade>
                </Modal>
            ) : (
                ""
            )}
        </>
    )
}
