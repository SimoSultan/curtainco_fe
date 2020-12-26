import React, { useState } from "react";

import { Typography, Grid, TextField, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function AddFabric() {
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

    const handleFabricSubmit = () => {};

    return (
        <>
            <Typography variant="h6">Add Fabric</Typography>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                        id="track-input"
                        label="Fabric Name"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="name"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-color-input"
                        label="Fabric Colour"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="color"
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="finial-style-input"
                        label="Fabric Density"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="density"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="finial-color-input"
                        label="Header Style"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="style"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fix-location-input"
                        label="Hem Size"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="size"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fix-location-input"
                        label="Length"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="length"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="price-input"
                        label="Price"
                        variant="outlined"
                        type="number"
                        onChange={handleTextChange}
                        name="price"
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFabricSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default AddFabric;
