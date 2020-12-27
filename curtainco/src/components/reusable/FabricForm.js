import React from "react";

import { Typography, Grid, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function FabricForm({
    title,
    buttonText,
    handleTextChange,
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
                        id="fabric-input"
                        label="Fabric Name"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="name"
                        value={product.name}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-color-input"
                        label="Fabric Colour"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="colour"
                        value={product.colour}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="fabric-density-input"
                        label="Fabric Density"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="density"
                        value={product.density}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-header-style-input"
                        label="Header Style"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="style"
                        value={product.style}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-size-input"
                        label="Hem Size"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="size"
                        value={product.size}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-length-input"
                        label="Length"
                        variant="outlined"
                        onChange={handleTextChange}
                        name="length"
                        value={product.length}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="fabric-price-input"
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
                {/* 
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
                </Grid> */}
            </Grid>
        </>
    );
}

export default FabricForm;
