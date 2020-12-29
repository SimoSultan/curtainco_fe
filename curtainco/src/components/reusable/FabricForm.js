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
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                        id="fabric-input"
                        label="Fabric Name"
                        variant="outlined"
                        name="name"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.name}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-color-input"
                        label="Fabric Colour"
                        variant="outlined"
                        name="colour"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.colour}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="fabric-density-input"
                        label="Fabric Density"
                        variant="outlined"
                        name="density"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.density}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-header-style-input"
                        label="Header Style"
                        variant="outlined"
                        name="style"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.style}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-size-input"
                        label="Hem Size"
                        variant="outlined"
                        name="size"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.size}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-length-input"
                        label="Length"
                        variant="outlined"
                        name="length"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={product.length}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-price-input"
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

export default FabricForm;
