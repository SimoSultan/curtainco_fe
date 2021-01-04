import React, { useState } from "react";

import {
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Divider,
} from "@material-ui/core";
import {
    createProduct,
    submitProductToDbAndUpdateState,
} from "../../../../services/productServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import AccessoryForm from "../../../reusable/AccessoryForm";

function AddAccessory() {
    const { dispatch } = useCurtainContext();
    const [checkedValue, setCheckedValue] = useState("Flick Stick");
    const [resetFile, setResetFile] = useState(false);
    const [photo, setPhoto] = useState({});
    const [accessory, setAccessory] = useState({
        category: "Accessory",
        name: "",
        colour: "",
        imgUrl: "",
        price: "",
        description: "",
        type: "Flick Stick",
    });

    function resetProductForm() {
        setAccessory({
            category: "Accessory",
            name: "",
            colour: "",
            imgUrl: "",
            price: "",
            description: "",
            type: "",
        });
    }

    function handleFileChange(file) {
        console.log(file);
        setPhoto(file);
    }

    function handleTypeChange(event) {
        event.preventDefault();
        setCheckedValue(event.target.value);
        setAccessory({ ...accessory, type: event.target.value });
    }

    function handleTextChange(event) {
        setAccessory({ ...accessory, [event.target.name]: event.target.value });
    }

    async function handleSubmit() {
        let respOrError = await submitProductToDbAndUpdateState(
            "add",
            accessory,
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
        <>
            <FormControl component="fieldset" style={{ marginTop: "4%" }}>
                <FormLabel component="legend">Which Accessory?</FormLabel>
                <RadioGroup
                    aria-label="add-accessory"
                    name="add-accessory"
                    value={checkedValue}
                    onChange={handleTypeChange}
                    row
                >
                    <FormControlLabel
                        value="Flick Stick"
                        control={<Radio />}
                        label="Flick Stick"
                    />
                    <FormControlLabel
                        value="Automated"
                        control={<Radio />}
                        label="Automated"
                    />
                    <FormControlLabel
                        value="Tie Back"
                        control={<Radio />}
                        label="Tie Back"
                    />
                    <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                    />
                </RadioGroup>
            </FormControl>

            <Divider />

            <AccessoryForm
                title={"Add Accessory"}
                handleTextChange={handleTextChange}
                handleSubmit={handleSubmit}
                handleRemove={false}
                product={accessory}
                handleFileChange={handleFileChange}
                setResetFile={setResetFile}
                resetFile={resetFile}
            />
        </>
    );
}

export default AddAccessory;
