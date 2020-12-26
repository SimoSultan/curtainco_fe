import React, { useState } from "react";

import { createProduct } from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import TrackForm from "../../../reusable/TrackForm";

function AddTrack() {
    const [singleTrack, setSingleTrack] = useState(null);
    const { dispatch } = useCurtainContext();

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

    console.log(singleTrack);

    const handleRadioChange = (event) => {
        setSingleTrack(event.target.value === "single" ? true : false);
    };

    const handleTextChange = (event) => {
        setTrack({ ...track, [event.target.name]: event.target.value });
    };

    const handleTrackSubmit = () => {
        let addProdError = false;
        createProduct(track)
            .then((resp) => {
                let prod = resp.data;
                console.log(resp);

                if (resp.status === 201) {
                    dispatch({
                        type: ACTIONS.ADD_PRODUCT,
                        payload: track,
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

    return (
        <TrackForm
            title={"Add Track"}
            buttonText={"Add"}
            handleTextChange={handleTextChange}
            handleRadioChange={handleRadioChange}
            handleTrackSubmit={handleTrackSubmit}
            track={false}
        />
    );
}

export default AddTrack;
