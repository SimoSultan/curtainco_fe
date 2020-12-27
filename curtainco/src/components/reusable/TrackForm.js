import React from "react";

import { Typography, Grid, TextField, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";

function TrackForm({
    title,
    buttonText,
    handleTextChange,
    handleRadioChange,
    handleSubmit,
    product,
    handleRemove,
}) {
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
                        value={product.name}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-type-input"
                        label="Track Type"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="type"
                        value={product.type}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-color-input"
                        label="Track Colour"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="colour"
                        value={product.colour}
                    />
                </Grid>
                <Grid item>
                    {/* IF PRODUCT.SINGLE IS EMPTY, DONT SELECT ANYTHING */}
                    {/* OTHERWISE CHANGE TRUE -> SINGLE AND FALSE -> DOUBLE */}
                    <RadioGroup
                        aria-label="single-double-input"
                        name="single"
                        value={
                            product.single === ""
                                ? null
                                : product.single
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
                        id="track-finial-style-input"
                        label="Finial Style"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="finialStyle"
                        value={product.finialStyle}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-finial-color-input"
                        label="Finial Colour"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="finialColour"
                        value={product.finialColour}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-fix-location-input"
                        label="Fix Location"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="location"
                        value={product.location}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-price-input"
                        label="Price"
                        variant="outlined"
                        type="number"
                        onChange={handleTextChange}
                        name="price"
                        value={product.price}
                    />
                </Grid>
                {product ? (
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                {buttonText}
                            </Button>
                        </Grid>
                        {/* IF THE REMOVE HANDLER WAS PASSED IN, SHOW THE DELETE BUTTON */}
                        <Grid item>
                            {handleRemove ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleRemove}
                                >
                                    Delete
                                </Button>
                            ) : (
                                ""
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    ""
                )}
            </Grid>
        </>
    );
}

export default TrackForm;
