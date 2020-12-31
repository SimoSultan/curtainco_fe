import React, { useState } from "react";

import { createProduct } from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import AccessoryForm from "../../../reusable/AccessoryForm";
import AccessoryForm2 from "../../../reusable/AccessoryForm2";

function AddAccessory() {
    const { dispatch } = useCurtainContext();
    const [accessory, setAccessory] = useState({
        category: "Accessory",
        name: "",
        colour: "",
        imgUrl: "",
        price: "",
        length: "",
        automated: "",
        tieBack: "",
        other: "",
    });

    const handleRadioChange = (event) => {
        const automated = event.target.value === "automated" ? true : false;
        setAccessory({
            ...accessory,
            [event.target.name]: automated,
        });
    };

    const handleTextChange = (event) => {
        setAccessory({ ...accessory, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        // ADD THE PRODUCT ON THE DB
        // IF SUCCESSFUL, ADD PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        let addProdError = false;
        console.log(accessory);
        createProduct(accessory)
            .then((resp) => {
                if (resp.status === 201) {
                    dispatch({
                        type: ACTIONS.ADD_PRODUCT,
                        payload: accessory,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Accessory successfully added",
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

    return (
        <AccessoryForm2
            title={"Add Accessory"}
            buttonText={"Add"}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
            handleRadioChange={handleRadioChange}
            handleRemove={false}
            product={accessory}
        />
    );
}

export default AddAccessory;
