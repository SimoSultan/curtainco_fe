import React from "react";

import { Typography, Grid, TextField, Button, Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import useStyles from "../../components/account/admin/AdminStyles";
import FileInput from "./FileInput";

function AccessoryForm({
    title,
    handleTextChange,
    handleSubmit,
    handleRemove,
    product,
    handleFileChange,
    setResetFile,
    resetFile,
}) {
    const classes = useStyles();

    console.log(product);

    return (
        <>
            <Typography
                variant="h6"
                component="h6"
                style={{ textAlign: "center" }}
            >
                {title}
            </Typography>

            <div className={classes.accessoryCont}>
                <Box pb={1}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={3}>
                            {product.imgUrl !== "" ? (
                                <img
                                    src={
                                        product.imgUrl !== ""
                                            ? product.imgUrl
                                            : ""
                                    }
                                    alt={
                                        product.imgUrl === ""
                                            ? ""
                                            : `${product.colour} ${product.name}`
                                    }
                                    className={classes.editFormImage}
                                />
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid
                            item
                            container
                            justify="center"
                            alignItems="center"
                            xs={9}
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    style={{ textAlign: "center" }}
                                >
                                    {product.type}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FileInput
                                    handleFileChange={handleFileChange}
                                    resetFile={resetFile}
                                    setResetFile={setResetFile}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={12}>
                        <TextField
                            label={`${product.type} Name`}
                            variant="outlined"
                            name="name"
                            onChange={handleTextChange}
                            value={product.name}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={`${product.type} Description`}
                            variant="outlined"
                            name="description"
                            fullWidth
                            multiline
                            onChange={handleTextChange}
                            value={product.description}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label={`${product.type} Colour`}
                            variant="outlined"
                            name="colour"
                            multiline
                            fullWidth
                            onChange={handleTextChange}
                            value={product.colour}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Price"
                            variant="outlined"
                            name="price"
                            fullWidth
                            onChange={handleTextChange}
                            value={product.price}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        justify="space-between"
                        alignItems="center"
                        xs={12}
                        style={{ paddingTop: "5%" }}
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
                                {`Update ${product.type}`}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default AccessoryForm;
