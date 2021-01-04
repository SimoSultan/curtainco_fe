import React, { useState } from "react";

import { createProduct } from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import TrackForm from "../../../reusable/TrackForm";

function AddTrack() {
    const { dispatch } = useCurtainContext();
    const [resetFile, setResetFile] = useState(false);
    const [photo, setPhoto] = useState({});
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
        description: "",
    });

    function handleFileChange(file) {
        console.log(file);
        setPhoto(file);
    }

    function handleRadioChange(event) {
        const singleTrack = event.target.value === "single" ? true : false;
        setTrack({
            ...track,
            [event.target.name]: singleTrack,
        });
    }

    function handleTextChange(event) {
        setTrack({ ...track, [event.target.name]: event.target.value });
    }

    function handleSubmit() {
        // ADD THE PRODUCT ON THE DB
        // IF SUCCESSFUL, ADD PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        let addProdError = false;
        console.log(track);

        try {
            let resp = createProduct(track);
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
                addProdError = `An status code error ocurred on adding product: Error Code: ${resp.status}. Message: ${resp.message}.`;
                console.log(addProdError);
            }
        } catch (error) {
            addProdError = `An error ocurred on adding product: Error Code: ${error.status}. Message: ${error.message}.`;
            console.log(addProdError);
        }
        // createProduct(track)
        // .then((resp) => {
        //     if (resp.status === 201) {
        //         dispatch({
        //             type: ACTIONS.ADD_PRODUCT,
        //             payload: track,
        //         });
        //         dispatch({
        //             type: ACTIONS.SET_SNACKBAR,
        //             payload: {
        //                 open: true,
        //                 success: "success",
        //                 message: "Track successfully added",
        //             },
        //         });
        //     } else {
        //         addProdError = `An status code error ocurred on adding product: Error Code: ${resp.status}. Message: ${resp.message}.`;
        //         console.log(addProdError);
        //     }
        // })
        // .catch((error) => {
        //     addProdError = `An error ocurred on adding product: Error Code: ${error.status}. Message: ${error.message}.`;
        //     console.log(addProdError);
        // });
    }

    // PASS IN TITLE AND TEXT FOR THE BUTTON TO THE TRACK FORM
    // PASS IN THE HANDLERS, HANDLE REMOVE IS FALSE DUE TO NOT WANTING TO DISPLAY BUTTON ON THE ADD FORM
    // PASS IN THE CURRENT TRACK WHICH WILL BE EMPTY
    return (
        <TrackForm
            title={"Add Track"}
            buttonText={"Submit Track"}
            handleTextChange={handleTextChange}
            handleRadioChange={handleRadioChange}
            handleSubmit={handleSubmit}
            handleRemove={false}
            product={track}
            handleFileChange={handleFileChange}
            setResetFile={setResetFile}
            resetFile={resetFile}
        />
    );
}

export default AddTrack;
