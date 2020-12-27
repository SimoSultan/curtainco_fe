import React, { useState, useEffect } from "react";
import TrackForm from "../../../reusable/TrackForm";
import { updateProduct } from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import useStyles from "../AdminStyles";
import { getOneProduct } from "../../../../helpers/productHelpers";
import { Paper } from "@material-ui/core";

function EditTrack({ productId }) {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    const [track, setTrack] = useState({
        category: "Track",
        _id: "",
        name: "",
        colour: "",
        imgUrl: "",
        price: "",
        type: "",
        single: "",
        finialStyle: "",
        finialColour: "",
        location: "",
    });

    useEffect(() => {
        if (productId !== "") {
            const trackBeingUpdated = getOneProduct(state.products, productId);
            setTrack({
                category: trackBeingUpdated.category,
                name: trackBeingUpdated.name,
                _id: trackBeingUpdated._id,
                colour: trackBeingUpdated.colour,
                imgUrl: trackBeingUpdated.imgUrl,
                price: trackBeingUpdated.price,
                type: trackBeingUpdated.type,
                single: trackBeingUpdated.single,
                finialStyle: trackBeingUpdated.finialStyle,
                finialColour: trackBeingUpdated.finialColour,
                location: trackBeingUpdated.location,
            });
        }
    }, [state.products, productId]);

    const handleRadioChange = (event) => {
        const singleTrack = event.target.value === "single" ? true : false;
        setTrack({
            ...track,
            [event.target.name]: singleTrack,
        });
    };

    const handleTextChange = (event) => {
        setTrack({ ...track, [event.target.name]: event.target.value });
    };

    const handleUpdateProduct = () => {
        let editProdError = false;
        updateProduct(track)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 200) {
                    dispatch({
                        type: ACTIONS.UPDATE_PRODUCT,
                        payload: track,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Track successfully updated",
                        },
                    });
                } else {
                    editProdError = `An error ocurred on update product: Error Code: ${resp.status}. Message: ${resp.message}.`;
                    console.log(editProdError);
                }
            })
            .catch((error) => {
                editProdError = `An error ocurred on update product: Error Code: ${error.status}. Message: ${error.message}.`;
                console.log(editProdError);
            });
    };

    return (
        <Paper className={classes.paper}>
            <TrackForm
                title={"Edit Track"}
                buttonText={"Update"}
                handleTextChange={handleTextChange}
                handleRadioChange={handleRadioChange}
                handleTrackSubmit={handleUpdateProduct}
                track={track}
            />
        </Paper>
    );
}

export default EditTrack;
