import React from "react";

import { Typography, Grid, TextField, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../../components/account/admin/AdminStyles";

function TrackForm({
    title,
    buttonText,
    handleTextChange,
    handleRadioChange,
    handleSubmit,
    product,
    handleRemove,
}) {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h6">{title}</Typography>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                        id="track-input"
                        label="Track Name"
                        variant="outlined"
                        name="name"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.name}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-type-input"
                        label="Track Type"
                        variant="outlined"
                        name="type"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.type}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-color-input"
                        label="Track Colour"
                        variant="outlined"
                        name="colour"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.colour}
                    />
                </Grid>
                <Grid item>
                    {/* IF PRODUCT.SINGLE IS EMPTY, DONT SELECT ANYTHING */}
                    {/* OTHERWISE CHANGE TRUE -> SINGLE AND FALSE -> DOUBLE */}
                    <RadioGroup
                        aria-label="single-double-input"
                        name="single"
                        className={classes.fullWidth}
                        onChange={handleRadioChange}
                        row
                        value={
                            product.single === ""
                                ? null
                                : product.single
                                ? "single"
                                : "double"
                        }
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
                        name="finialStyle"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.finialStyle}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-finial-color-input"
                        label="Finial Colour"
                        variant="outlined"
                        name="finialColour"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.finialColour}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-fix-location-input"
                        label="Fix Location"
                        variant="outlined"
                        name="location"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.location}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-description-input"
                        label="Description"
                        variant="outlined"
                        name="description"
                        multiline
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.description}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="track-price-input"
                        label="Price"
                        variant="outlined"
                        type="number"
                        name="price"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
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
