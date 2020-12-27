import React, { useState } from "react";

import { createProduct } from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import TrackForm from "../../../reusable/TrackForm";

function AddTrack() {
    const { dispatch } = useCurtainContext();
    const [track, setTrack] = useState({
        category: "Track",
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

    const handleTrackSubmit = () => {
        // ADD THE PRODUCT ON THE DB
        // IF SUCCESSFUL, ADD PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        let addProdError = false;
        console.log(track);
        createProduct(track)
            .then((resp) => {
                if (resp.status === 201) {
                    dispatch({
                        type: ACTIONS.ADD_PRODUCT,
                        payload: track,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Track successfully added",
                        },
                    });
                } else {
                    addProdError = `An error ocurred on adding product: Error Code: ${resp.status}. Message: ${resp.message}.`;
                    console.log(addProdError);
                }
            })
            .catch((error) => {
                addProdError = `An error ocurred on adding product: Error Code: ${error.status}. Message: ${error.message}.`;
                console.log(addProdError);
            });
    };

    // PASS IN TITLE AND TEXT FOR THE BUTTON TO THE TRACK FORM
    // PASS IN THE HANDLERS, HANDLE REMOVE IS FALSE DUE TO NOT WANTING TO DISPLAY BUTTON ON THE ADD FORM
    // PASS IN THE CURRENT TRACK WHICH WILL BE EMPTY
    return (
        <TrackForm
            title={"Add Track"}
            buttonText={"Add"}
            handleTextChange={handleTextChange}
            handleRadioChange={handleRadioChange}
            handleTrackSubmit={handleTrackSubmit}
            handleTrackRemove={false}
            track={track}
        />
    );
}

export default AddTrack;
