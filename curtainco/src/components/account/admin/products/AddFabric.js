import React, { useState } from "react";
import FabricForm from "../../../reusable/FabricForm";
import { createProduct } from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";

function AddFabric() {
    const { dispatch } = useCurtainContext();
    const [fabric, setFabric] = useState({
        category: "Fabric",
        name: "",
        colour: "",
        imgUrl: "",
        price: "",
        density: "",
        style: "",
        size: "",
        length: "",
    });

    const handleTextChange = (event) => {
        setFabric({ ...fabric, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        // ADD THE PRODUCT ON THE DB
        // IF SUCCESSFUL, ADD PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        let addProdError = false;
        console.log(fabric);
        createProduct(fabric)
            .then((resp) => {
                if (resp.status === 201) {
                    dispatch({
                        type: ACTIONS.ADD_PRODUCT,
                        payload: fabric,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Fabric successfully added",
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
        <FabricForm
            title={"Add Fabric"}
            buttonText={"Add"}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
            handleRemove={false}
            product={fabric}
        />
    );
}

export default AddFabric;
