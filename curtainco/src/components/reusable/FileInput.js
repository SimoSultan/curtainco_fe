import React, { useState, useEffect } from "react";
import { Fab, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    fileName: {
        fontStyle: "italic",
        width: "90%",
    },
}));

function FileInput({ handleFileChange, resetFile, setResetFile }) {
    const classes = useStyles();
    const [file, setFile] = useState({});

    useEffect(() => {
        if (resetFile) {
            // resetFile is true when we update the form
            // and need to update the value back to false
            // to stop an infinite loop
            setFile({});
            setResetFile(false);
        }
    }, [file, resetFile, setResetFile]);

    function handleChange(event) {
        setFile(event.target.files[0]);
        handleFileChange(event.target.files[0]);
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <label htmlFor="upload-photo">
                    <input
                        hidden
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={handleChange}
                    />
                    <Button
                        color="primary"
                        variant="outlined"
                        component="span"
                        aria-label="add-photo"
                    >
                        Choose photo
                    </Button>
                </label>
            </Grid>
            <Grid item xs={6}>
                <Typography
                    variant="subtitle1"
                    className={classes.fileName}
                    noWrap
                >
                    {file.name}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default FileInput;
