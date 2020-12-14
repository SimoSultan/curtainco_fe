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

export default function Filter() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        fabric: false,
        rod: false,
        accessory: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { fabric, rod, accessory } = state;
    const error = [fabric, rod, accessory].filter((v) => v).length !== 2;

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
                                checked={rod}
                                onChange={handleChange}
                                name="rod"
                            />
                        }
                        label="Rods"
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
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
            </FormControl>
        </div>
    );
}
