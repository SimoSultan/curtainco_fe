import React, { useState, useEffect } from "react";

import AccessoryForm from "../../../reusable/AccessoryForm";
import {
    updateProduct,
    deleteProduct,
} from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import { getOneProductFromState } from "../../../../helpers/productHelpers";

function EditDeleteAccessory({ editProductId, setEditProductId }) {
    const { state, dispatch } = useCurtainContext();
    const [accessory, setAccessory] = useState({
        category: "Accessory",
        _id: "",
        name: "",
        colour: "",
        imgUrl: "",
        price: "",
        length: "",
        automated: "",
        tieBack: "",
        other: "",
    });

    useEffect(() => {
        // IF PRODUCT ID COMES THROUGH AS A PROP, SET THE FORM
        // OTHERWISE CLEAR THE FORM
        if (editProductId !== "") {
            const accessoryBeingUpdated = getOneProductFromState(
                state.products,
                editProductId
            );
            setAccessory({
                category: accessoryBeingUpdated.category,
                _id: accessoryBeingUpdated._id,
                name: accessoryBeingUpdated.name,
                colour: accessoryBeingUpdated.colour,
                imgUrl: accessoryBeingUpdated.imgUrl,
                price: accessoryBeingUpdated.price,
                length: accessoryBeingUpdated.length,
                automated: accessoryBeingUpdated.automated,
                tieBack: accessoryBeingUpdated.tieBack,
                other: accessoryBeingUpdated.other,
            });
        } else {
            setAccessory({
                category: "Accessory",
                _id: "",
                name: "",
                colour: "",
                imgUrl: "",
                price: "",
                length: "",
                automated: "",
                tieBack: "",
                other: "",
            });
        }
    }, [state.products, editProductId]);

    const handleRadioChange = (event) => {
        const automated = event.target.value === "auto" ? true : false;
        setAccessory({
            ...accessory,
            [event.target.name]: automated,
        });
    };

    const handleTextChange = (event) => {
        setAccessory({ ...accessory, [event.target.name]: event.target.value });
    };

    const handleUpdateProduct = () => {
        // UPDATE THE PRODUCT ON THE DB
        // IF SUCCESSFUL, UPDATE PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        let editProdError = false;
        updateProduct(accessory)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 200) {
                    dispatch({
                        type: ACTIONS.UPDATE_PRODUCT,
                        payload: accessory,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Accessory successfully updated",
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
        deleteProduct(accessory)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 202) {
                    dispatch({
                        type: ACTIONS.DELETE_PRODUCT,
                        payload: accessory._id,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Accessory successfully deleted",
                        },
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setEditProductId("");
    }

    // PASS IN TITLE AND TEXT FOR THE BUTTON TO THE Accessory FORM
    // PASS IN THE HANDLERS
    // PASS IN THE CURRENT Accessory
    return (
        <AccessoryForm
            title={"Edit Accessory"}
            buttonText={"Update"}
            handleTextChange={handleTextChange}
            handleRadioChange={handleRadioChange}
            handleSubmit={handleUpdateProduct}
            handleRemove={handleRemoveProduct}
            product={editProductId === "" ? false : accessory}
        />
    );
}

export default EditDeleteAccessory;
