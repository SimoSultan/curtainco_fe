import React, { useState } from "react";
import FabricForm from "../../../reusable/FabricForm";
import {
    createProduct,
    submitProductToDbAndUpdateState,
} from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";

function AddFabric() {
    const { dispatch } = useCurtainContext();
    const [resetFile, setResetFile] = useState(false);
    const [photo, setPhoto] = useState({});
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

    function resetProductForm() {
        setFabric({
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
    }

    function handleFileChange(file) {
        console.log(file);
        setPhoto(file);
    }

    const handleTextChange = (event) => {
        setFabric({ ...fabric, [event.target.name]: event.target.value });
    };

    async function handleSubmit() {
        let respOrError = await submitProductToDbAndUpdateState(
            "add",
            fabric,
            dispatch,
            ACTIONS,
            setResetFile,
            setPhoto,
            photo,
            resetProductForm
        );
        console.log(respOrError);
    }

    return (
        <FabricForm
            title={"Add Fabric"}
            buttonText={"Submit Fabric"}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
            handleRemove={false}
            product={fabric}
            handleFileChange={handleFileChange}
            setResetFile={setResetFile}
            resetFile={resetFile}
        />
    );
}

export default AddFabric;
