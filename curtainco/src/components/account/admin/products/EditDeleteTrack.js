import React, { useState, useEffect } from "react";

import TrackForm from "../../../reusable/TrackForm";
import {
    updateProduct,
    deleteProduct,
} from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import { getOneProductFromState } from "../../../../helpers/productHelpers";

function EditDeleteTrack({ editProductId, setEditProductId }) {
    const { state, dispatch } = useCurtainContext();
    const [resetFile, setResetFile] = useState(false);
    const [previousProduct, setPreviousProduct] = useState(editProductId);
    const [photo, setPhoto] = useState({});
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
        description: "",
    });

    function handleFileChange(file) {
        console.log("here 2");
        console.log(file);
        setPhoto(file);
    }

    useEffect(() => {
        // this resets the file in the FileInput component on
        // a product change / update to form
        if (editProductId !== previousProduct) {
            setPreviousProduct(editProductId);
            setResetFile(true);
        }
        // IF PRODUCT ID COMES THROUGH AS A PROP, SET THE FORM
        // OTHERWISE CLEAR THE FORM
        if (editProductId !== "") {
            const trackBeingUpdated = getOneProductFromState(
                state.products,
                editProductId
            );
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
                description: trackBeingUpdated.description,
            });
        } else {
            setTrack({
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
                description: "",
                location: "",
            });
        }
    }, [state.products, editProductId, previousProduct]);

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
        // UPDATE THE PRODUCT ON THE DB
        // IF SUCCESSFUL, UPDATE PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
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

    function handleRemoveProduct() {
        // DELETE THE PRODUCT ON THE DB
        // IF SUCCESSFUL, DELETE PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        // THEN SET THE EDIT PRODUCT ID THAT THIS COMPONENT TAKES AS A PROP TO = "" TO RESET THE FORM
        deleteProduct(track)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 202) {
                    dispatch({
                        type: ACTIONS.DELETE_PRODUCT,
                        payload: track._id,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Track successfully deleted",
                        },
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setEditProductId("");
    }

    // PASS IN TITLE AND TEXT FOR THE BUTTON TO THE TRACK FORM
    // PASS IN THE HANDLERS
    // PASS IN THE CURRENT TRACK
    return (
        <TrackForm
            title={"Edit Track"}
            buttonText={"Update"}
            handleTextChange={handleTextChange}
            handleRadioChange={handleRadioChange}
            handleSubmit={handleUpdateProduct}
            handleRemove={handleRemoveProduct}
            product={editProductId === "" ? false : track}
            handleFileChange={handleFileChange}
            setResetFile={setResetFile}
            resetFile={resetFile}
        />
    );
}

export default EditDeleteTrack;
