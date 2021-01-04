import React from "react";

import { Typography, Grid, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../../components/account/admin/AdminStyles";

function FabricForm({
    title,
    buttonText,
    handleTextChange,
    handleSubmit,
    product,
    handleRemove,
}) {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h6">{title}</Typography>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        id="fabric-input"
                        label="Fabric Name"
                        variant="outlined"
                        name="name"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="fabric-description-input"
                        label="Description"
                        variant="outlined"
                        name="description"
                        multiline
                        fullWidth
                        onChange={handleTextChange}
                        value={product.description}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-color-input"
                        label="Fabric Colour"
                        variant="outlined"
                        name="colour"
                        fullWidth
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.colour}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-density-input"
                        label="Fabric Density"
                        variant="outlined"
                        name="density"
                        fullWidth
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.density}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-header-style-input"
                        label="Header Style"
                        variant="outlined"
                        name="style"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.style}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-size-input"
                        label="Hem Size"
                        variant="outlined"
                        name="size"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.size}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-length-input"
                        label="Length"
                        variant="outlined"
                        name="length"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.length}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-price-input"
                        label="Price"
                        variant="outlined"
                        type="number"
                        name="price"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.price}
                    />
                </Grid>

                {product ? (
                    <Grid
                        item
                        container
                        justify="space-between"
                        alignItems="center"
                        xs={12}
                    >
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
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                {buttonText}
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    ""
                )}
            </Grid>
        </>
    );
}

export default FabricForm;
