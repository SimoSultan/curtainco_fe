import React, { useState, useEffect } from "react";

import FabricForm from "../../../reusable/FabricForm";
import {
    updateProduct,
    deleteProduct,
} from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import { getOneProductFromState } from "../../../../helpers/productHelpers";

function EditDeleteFabric({ editProductId, setEditProductId }) {
    const { state, dispatch } = useCurtainContext();
    const [fabric, setFabric] = useState({
        category: "Fabric",
        _id: "",
        name: "",
        colour: "",
        imgUrl: "",
        price: "",
        density: "",
        style: "",
        size: "",
        length: "",
    });

    useEffect(() => {
        // IF PRODUCT ID COMES THROUGH AS A PROP, SET THE FORM
        // OTHERWISE CLEAR THE FORM
        if (editProductId !== "") {
            const fabricBeingUpdated = getOneProductFromState(
                state.products,
                editProductId
            );
            setFabric({
                category: fabricBeingUpdated.category,
                _id: fabricBeingUpdated._id,
                name: fabricBeingUpdated.name,
                colour: fabricBeingUpdated.colour,
                imgUrl: fabricBeingUpdated.imgUrl,
                price: fabricBeingUpdated.price,
                density: fabricBeingUpdated.density,
                style: fabricBeingUpdated.style,
                size: fabricBeingUpdated.size,
                length: fabricBeingUpdated.length,
            });
        } else {
            setFabric({
                category: "Fabric",
                _id: "",
                name: "",
                colour: "",
                imgUrl: "",
                price: "",
                density: "",
                style: "",
                size: "",
                length: "",
            });
        }
    }, [state.products, editProductId]);

    const handleTextChange = (event) => {
        setFabric({ ...fabric, [event.target.name]: event.target.value });
    };

    const handleUpdateProduct = () => {
        // UPDATE THE PRODUCT ON THE DB
        // IF SUCCESSFUL, UPDATE PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        let editProdError = false;
        updateProduct(fabric)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 200) {
                    dispatch({
                        type: ACTIONS.UPDATE_PRODUCT,
                        payload: fabric,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Fabric successfully updated",
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
        deleteProduct(fabric)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 202) {
                    dispatch({
                        type: ACTIONS.DELETE_PRODUCT,
                        payload: fabric._id,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Fabric successfully deleted",
                        },
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setEditProductId("");
    }

    // PASS IN TITLE AND TEXT FOR THE BUTTON TO THE Fabric FORM
    // PASS IN THE HANDLERS
    // PASS IN THE CURRENT FABRIC
    return (
        <FabricForm
            title={"Edit Fabric"}
            buttonText={"Update"}
            handleTextChange={handleTextChange}
            handleSubmit={handleUpdateProduct}
            handleRemove={handleRemoveProduct}
            product={editProductId === "" ? false : fabric}
        />
    );
}

export default EditDeleteFabric;
