import React, { useState, useEffect } from "react";
import TrackForm from "../../../reusable/TrackForm";
import { createProduct } from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import useStyles from "../AdminStyles";
import { getOneProduct } from "../../../../helpers/productHelpers";
import { Paper } from "@material-ui/core";

function EditTrack({ productId }) {
    const classes = useStyles();
    const [singleTrack, setSingleTrack] = useState();
    const { state, dispatch } = useCurtainContext();
    const [track, setTrack] = useState({
        category: "Track",
        name: "",
        colour: "",
        imgUrl: "",
        price: "",
        type: "",
        single: singleTrack,
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
        setSingleTrack(event.target.value === "single" ? true : false);
    };

    const handleTextChange = (event) => {
        setTrack({ ...track, [event.target.name]: event.target.value });
    };

    const handleUpdateProduct = () => {
        let editProdError = false;
        createProduct(track)
            .then((resp) => {
                let prod = resp.data;
                console.log(resp);

                if (resp.status === 201) {
                    dispatch({
                        type: ACTIONS.UPDATE_PRODUCT,
                        payload: track,
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
