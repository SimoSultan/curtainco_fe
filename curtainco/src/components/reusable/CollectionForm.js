import React from "react";

import { Typography, Grid, TextField, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import useStyles from "../../components/account/admin/AdminStyles";
import { useCurtainContext } from "../../config/CurtainCoContext";

function CollectionForm({
    title,
    buttonText,
    handleTextChange,
    handleFabricChange,
    handleTrackChange,
    handleAccessoryChange,
    handleSubmit,
    collection,
    handleRemove,
}) {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    let allFabrics = state.products.filter(
        (prod) => prod.category === "Fabric"
    );
    let allTracks = state.products.filter((prod) => prod.category === "Track");
    let allAccessories = state.products.filter(
        (prod) => prod.category === "Accessory"
    );

    console.log(allFabrics);
    console.log(allTracks);
    console.log(allAccessories);
    let fabricItems = allFabrics.map((fabric) => (
        <MenuItem key={fabric._id} value={fabric}>
            {fabric.name}
        </MenuItem>
    ));
    let trackItems = allTracks.map((track) => (
        <MenuItem key={track._id} value={track}>
            {track.name}
        </MenuItem>
    ));
    let accessoryItems = allAccessories.map((accessory) => (
        <MenuItem key={accessory._id} value={accessory}>
            {accessory.name}
        </MenuItem>
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
                        <InputLabel id="collection-fabric-input-label">
                            Fabric
                        </InputLabel>
                        <Select
                            labelId="collection-fabric-input-label"
                            id="collection-fabric-input"
                            value={collection.fabric}
                            onChange={handleFabricChange}
                            name="fabric"
                            label="Fabric"
                        >
                            {fabricItems}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel id="collection-fabric-input-label">
                            Track
                        </InputLabel>
                        <Select
                            labelId="collection-fabric-input-label"
                            id="collection-fabric-input"
                            value={collection.track}
                            onChange={handleTrackChange}
                            label="Track"
                            name="track"
                        >
                            {trackItems}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel id="collection-fabric-input-label">
                            Accessory
                        </InputLabel>
                        <Select
                            labelId="collection-fabric-input-label"
                            id="collection-fabric-input"
                            value={collection.accessory}
                            onChange={handleAccessoryChange}
                            label="Accessory"
                            name="accessory"
                            fullWidth
                        >
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
