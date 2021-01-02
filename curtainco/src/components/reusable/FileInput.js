import React, { useState, useEffect } from "react";
import { Fab, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    fileName: {
        fontStyle: "italic",
        width: "90%",
    },
}));

function FileInput({ handleFileChange, resetFile, cb }) {
    const classes = useStyles();
    const [file, setFile] = useState({});

    useEffect(() => {
        if (resetFile) {
            setFile({});
            cb(false);
        }
    }, [resetFile, cb]);

    function handleChange(event) {
        setFile(event.target.files[0]);
        handleFileChange(event.target.files[0]);
    }

    return (
        <Grid container>
            <Grid item xs={7}>
                <label htmlFor="upload-photo">
                    <input
                        hidden
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={handleChange}
                    />
                    <Fab
                        color="secondary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                    >
                        <AddIcon /> Choose photo
                    </Fab>
                </label>
            </Grid>
            <Grid item xs={5}>
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
