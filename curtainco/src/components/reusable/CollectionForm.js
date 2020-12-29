import React from "react";

import { Typography, Grid, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useStyles from "../../components/account/admin/AdminStyles";
import { useCurtainContext } from "../../config/CurtainCoContext";

function CollectionForm({
    title,
    buttonText,
    handleTextChange,
    handleSelectChange,
    handleSubmit,
    collection,
    handleRemove,
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
            <Typography variant="h6">{title}</Typography>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                        id="collection-input"
                        label="Collection Name"
                        variant="outlined"
                        name="name"
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={collection.name}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="collection-description-input"
                        label="Collection Description"
                        variant="outlined"
                        name="description"
                        multiline
                        className={classes.fullWidth}
                        onChange={handleTextChange}
                        value={collection.description}
                    />
                </Grid>
                <Grid item>
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
                <Grid item>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <Select
                            labelId="collection-fabric-input-label"
                            id="collection-fabric-input"
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
                <Grid item>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <Select
                            labelId="collection-fabric-input-label"
                            id="collection-fabric-input"
                            value={collection.accessory}
                            onChange={handleSelectChange}
                            name="accessory"
                            defaultValue=""
                            native
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
                {/* <Grid item>
                    <RadioGroup
                        aria-label="single-double-input"
                        name="single"
                        onChange={handleRadioChange}
                        row
                        value={
                            collection.single === ""
                                ? null
                                : collection.single
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
                </Grid> */}

                <Grid item>
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
                {collection ? (
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

export default CollectionForm;
