import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function Filter({ state, handleChange }) {
    const classes = useStyles();
    const { fabric, track, accessory } = state;

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Filter Products</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fabric}
                                onChange={handleChange}
                                name="fabric"
                            />
                        }
                        label="Fabric"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={track}
                                onChange={handleChange}
                                name="track"
                            />
                        }
                        label="Tracks"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={accessory}
                                onChange={handleChange}
                                name="accessory"
                            />
                        }
                        label="Accessories"
                    />
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                checked={inStock}
                                onChange={handleChange}
                                name="inStock"
                            />
                        }
                        label="In Stock"
                    /> */}
                </FormGroup>
                {/* <FormHelperText>Some text here?</FormHelperText> */}
            </FormControl>
        </div>
    );
}
