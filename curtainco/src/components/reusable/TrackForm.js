import React from "react";

import { Typography, Grid, TextField, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function TrackForm({
    title,
    buttonText,
    handleTextChange,
    handleRadioChange,
    handleTrackSubmit,
    track,
}) {
    console.log(track);

    return (
        <>
            <Typography variant="h6">{title}</Typography>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                        id="track-input"
                        label="Track Name"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="name"
                        value={track ? track.name : ""}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-type-input"
                        label="Track Type"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="type"
                        value={track ? track.type : ""}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-color-input"
                        label="Track Colour"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="colour"
                        value={track ? track.colour : ""}
                    />
                </Grid>
                <Grid item>
                    <RadioGroup
                        aria-label="single-double-input"
                        name="single"
                        value={
                            track.single === ""
                                ? null
                                : track.single
                                ? "single"
                                : "double"
                        }
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
                        onChange={handleTextChange}
                        name="finialStyle"
                        value={track ? track.finialStyle : ""}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="finial-color-input"
                        label="Finial Colour"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="finialColour"
                        value={track ? track.finialColour : ""}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fix-location-input"
                        label="Fix Location"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="location"
                        value={track ? track.location : ""}
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
                        value={track ? track.price : ""}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleTrackSubmit}
                    >
                        {buttonText}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default TrackForm;
