import React from "react";

import { Typography, Grid, TextField, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";

function AccessoryForm({
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
                        id="accessory-input"
                        label="Accessory Name"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="name"
                        value={product.name}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="accessory-colour-input"
                        label="Accessory Colour"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="colour"
                        value={product.colour}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="accessory-length-input"
                        label="Accessory Length"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="length"
                        value={product.length}
                    />
                </Grid>
                <Grid item>
                    <RadioGroup
                        aria-label="automated-curtain-input"
                        name="automated"
                        onChange={handleRadioChange}
                        row
                        value={
                            product.automated === ""
                                ? null
                                : product.automated
                                ? "auto"
                                : "notAuto"
                        }
                    >
                        <FormControlLabel
                            value="auto"
                            control={<Radio />}
                            label="Automated"
                        />
                        <FormControlLabel
                            value="notAuto"
                            control={<Radio />}
                            label="Not Automated"
                        />
                    </RadioGroup>
                </Grid>
                <Grid item>
                    <TextField
                        id="accessory-tieBack-input"
                        label="Tie Back"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="tieBack"
                        value={product.tieBack}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="accessory-other-input"
                        label="Accessories"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="other"
                        value={product.other}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="accessory-price-input"
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

export default AccessoryForm;
