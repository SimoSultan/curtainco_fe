import React, { useState } from "react";

import { Typography, Grid, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function AddTrack() {
    const [singleTrack, setSingleTrack] = useState();
    const [track, setTrack] = useState({
        category: "Track",
        name: "",
        color: "",
        imgUrl: "",
        price: "",
        type: "",
        single: singleTrack,
        finialStyle: "",
        finialColour: "",
        location: "",
    });

    const handleRadioChange = (event) => {
        setSingleTrack(event.target.value === "single" ? true : false);
    };

    const handleTextChange = (event) => {
        setTrack({ ...track, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Typography variant="h6">Add Track</Typography>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                        id="track-input"
                        label="Track Name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-type-input"
                        label="Track Type"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-color-input"
                        label="Track Color"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <RadioGroup
                        aria-label="single-double-input"
                        name="single-double-input"
                        // value={singleTrack}
                        onChange={handleRadioChange}
                        row
                    >
                        <FormControlLabel
                            value="single"
                            control={<Radio />}
                            label="Single"
                        />
                        <FormControlLabel
                            value="double"
                            control={<Radio />}
                            label="Double"
                        />
                    </RadioGroup>
                </Grid>
                <Grid item>
                    <TextField
                        id="finial-style-input"
                        label="Finial Style"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="finial-color-input"
                        label="Finial Color"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fix-location-input"
                        label="Fix Location"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="price-input"
                        label="Price"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default AddTrack;
