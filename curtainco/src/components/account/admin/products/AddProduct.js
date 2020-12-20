import React, { useState } from "react";

import { Container } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AddFabric from "./AddFabric";
import AddTrack from "./AddTrack";
import AddAccessory from "./AddAccessory";

function AddProduct() {
    const [checkedValue, setCheckedValue] = useState("track");

    const handleChange = (event) => {
        setCheckedValue(event.target.value);
    };

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Which Product?</FormLabel>
                <RadioGroup
                    aria-label="add-product"
                    name="add-product"
                    value={checkedValue}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel
                        value="track"
                        control={<Radio />}
                        label="Tracks"
                    />
                    <FormControlLabel
                        value="fabric"
                        control={<Radio />}
                        label="Fabric"
                    />
                    <FormControlLabel
                        value="accessory"
                        control={<Radio />}
                        label="Accessory"
                    />
                </RadioGroup>
            </FormControl>

            <Container>
                {checkedValue === "track" ? (
                    <AddTrack />
                ) : checkedValue === "fabric" ? (
                    <AddFabric />
                ) : (
                    <AddAccessory />
                )}
            </Container>
        </div>
    );
}

export default AddProduct;
