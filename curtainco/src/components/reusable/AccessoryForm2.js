import React, { useState } from "react";

import {
    Typography,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    Container,
} from "@material-ui/core";
import FlickStick from "../account/admin/products/accessories/FlickStick";
import Automated from "../account/admin/products/accessories/Automated";
import TieBack from "../account/admin/products/accessories/TieBack";
import Other from "../account/admin/products/accessories/Other";

function AccessoryForm({ title }) {
    const [checkedValue, setCheckedValue] = useState("flickStick");

    function handleChange(event) {
        event.preventDefault();
        setCheckedValue(event.target.value);
    }

    return (
        <>
            <Typography
                variant="h6"
                component="h6"
                style={{ textAlign: "center" }}
            >
                {title}
            </Typography>

            <FormControl component="fieldset">
                <FormLabel component="legend">Which Accessory?</FormLabel>
                <RadioGroup
                    aria-label="add-accessory"
                    name="add-product"
                    value={checkedValue}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel
                        value="flickStick"
                        control={<Radio />}
                        label="Flick Stick"
                    />
                    <FormControlLabel
                        value="tieBack"
                        control={<Radio />}
                        label="Tie Back"
                    />
                    <FormControlLabel
                        value="automated"
                        control={<Radio />}
                        label="Automated"
                    />
                    <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                    />
                </RadioGroup>
            </FormControl>

            <Container>
                {checkedValue === "flickStick" ? (
                    <FlickStick />
                ) : checkedValue === "tieBack" ? (
                    <TieBack />
                ) : checkedValue === "automated" ? (
                    <Automated />
                ) : (
                    <Other />
                )}
            </Container>
        </>
    );
}

export default AccessoryForm;
