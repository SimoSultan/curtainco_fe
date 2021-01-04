import React from "react";

import { Typography, Grid, TextField, Button, Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useStyles from "../../components/account/admin/AdminStyles";
import { useCurtainContext } from "../../config/CurtainCoContext";
import FileInput from "./FileInput";

function CollectionForm({
    title,
    buttonText,
    handleTextChange,
    handleSelectChange,
    handleSubmit,
    collection,
    handleRemove,
    handleFileChange,
    setResetFile,
    resetFile,
}) {
    const classes = useStyles();
    const { state } = useCurtainContext();

    let allFabrics = state.products.filter(
        (prod) => prod.category === "Fabric"
    );
    let allTracks = state.products.filter((prod) => prod.category === "Track");
    let allAccessories = state.products.filter(
        (prod) => prod.category === "Accessory"
    );

    let fabricItems = allFabrics.map((fabric) => (
        <option key={fabric._id} value={fabric._id}>
            {fabric.name}
        </option>
    ));
    let trackItems = allTracks.map((track) => (
        <option key={track._id} value={track._id}>
            {track.name}
        </option>
    ));
    let accessoryItems = allAccessories.map((accessory) => (
        <option key={accessory._id} value={accessory._id}>
            {accessory.name}
        </option>
    ));

    return (
        <>
            <Box pb={1}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={3}>
                        {collection.imgUrl !== "" ? (
                            <img
                                src={
                                    collection.imgUrl !== ""
                                        ? collection.imgUrl
                                        : ""
                                }
                                alt={
                                    collection.imgUrl === ""
                                        ? ""
                                        : `${collection.name}`
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
                                {title}
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

            <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={12} sm={5}>
                    <TextField
                        id="collection-input"
                        label="Collection Name"
                        variant="outlined"
                        name="name"
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.name}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        label="Collection Description"
                        variant="outlined"
                        name="description"
                        multiline
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.description}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        id="collection-price-input"
                        label="Price"
                        variant="outlined"
                        type="number"
                        name="price"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={collection.price}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Fabric Tip"
                        variant="outlined"
                        name="fabricTip"
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.fabricTip}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Track Tip"
                        variant="outlined"
                        name="trackTip"
                        multiline
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.trackTip}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Accessory Tip"
                        variant="outlined"
                        name="accessoryTip"
                        multiline
                        fullWidth
                        onChange={handleTextChange}
                        value={collection.accessoryTip}
                    />
                </Grid>
                <Grid item container xs={12} sm={4}>
                    <Grid item xs={12}>
                        <FormControl
                            variant="outlined"
                            className={classes.formControl}
                        >
                            <Select
                                labelId="collection-fabric-input-label"
                                id="collection-fabric-input"
                                value={collection.fabric}
                                onChange={handleSelectChange}
                                name="fabric"
                                defaultValue=""
                                native
                            >
                                {
                                    <option
                                        aria-label="None"
                                        disabled
                                        label="Fabric"
                                        value=""
                                    />
                                }{" "}
                                {fabricItems}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item container xs={12} sm={4}>
                    <Grid item xs={12}>
                        <FormControl
                            variant="outlined"
                            className={classes.formControl}
                        >
                            <Select
                                labelId="collection-track-input-label"
                                id="collection-track-input"
                                value={collection.track}
                                onChange={handleSelectChange}
                                name="track"
                                defaultValue=""
                                native
                            >
                                {
                                    <option
                                        aria-label="None"
                                        disabled
                                        label="Track"
                                    />
                                }{" "}
                                {trackItems}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={4}>
                    <Grid item xs={12}>
                        <FormControl
                            variant="outlined"
                            className={classes.formControl}
                        >
                            <Select
                                labelId="collection-accessory-input-label"
                                id="collection-accessory-input"
                                value={collection.accessory}
                                onChange={handleSelectChange}
                                name="accessory"
                                defaultValue=""
                                // native
                            >
                                {
                                    <option
                                        aria-label="None"
                                        disabled
                                        label="Accessory"
                                    />
                                }
                                {accessoryItems}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {collection ? (
                    <Grid
                        item
                        container
                        justify="space-between"
                        alignItems="center"
                        fullWidth
                        xs={12}
                        style={{ marginTop: "5%" }}
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

export default CollectionForm;
