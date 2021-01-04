import React, { useState } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import useStyles from "../../AdminStyles";
import FileInput from "../../../../reusable/FileInput";
import { uploadPhotoToS3 } from "../../../../../services/uploadServices";
import { createAccessory } from "../../../../../services/productServices";
import { ACTIONS } from "../../../../../config/stateReducer";
import { useCurtainContext } from "../../../../../config/CurtainCoContext";

function FlickStick() {
    const classes = useStyles();
    const { dispatch } = useCurtainContext;
    const [photo, setPhoto] = useState({});
    const [resetFile, setResetFile] = useState(false);
    const [flickStick, setFlickStick] = useState({
        name: "",
        price: "",
        imgUrl: "",
        colour: "",
        description: "",
    });

    function handleChange(event) {
        setFlickStick({
            ...flickStick,
            [event.target.name]: event.target.value,
        });
    }

    function handleFileChange(file) {
        console.log(file);
        setPhoto(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("---Flick Stick---");
        console.log(flickStick);

        try {
            let s3Resp = await uploadPhotoToS3(photo);
            console.log(s3Resp);
            if (s3Resp.status === 201) {
                let flickStickWithPhoto = {
                    ...flickStick,
                    imgUrl: s3Resp.data.image.location,
                };
                console.log(flickStickWithPhoto);
                //     // SAVE TO SB
                //     try {
                //         let dbResp = await createAccessory(flickStickWithPhoto);
                //         if (dbResp.status === 201) {
                //             console.log("successful creation of accessory on DB");
                //             dispatch({
                //                 type: ACTIONS.ADD_PRODUCT,
                //                 payload: dbResp.data,
                //             });
                //             dispatch({
                //                 type: ACTIONS.SET_SNACKBAR,
                //                 payload: {
                //                     open: true,
                //                     severity: "success",
                //                     message: "Created accessory successfully",
                //                 },
                //             });
                setFlickStick({ name: "", price: "" });
                setResetFile(true);
                //         }
                //     } catch (error) {
                //         console.log(`Error saving flick stick to DB: ${error}`);
                //     }
            }
        } catch (error) {
            console.log(`Error saving flick stick photo to S3: ${error}`);
        }
    }

    return (
        <div className={classes.accessoryCont}>
            <Typography variant="body1" className={classes.accessorySubHeading}>
                Flick Stick
            </Typography>
            <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                    <TextField
                        id="accessory-flick-stick-name-input"
                        label="Flick Stick Name"
                        variant="outlined"
                        name="name"
                        onChange={handleChange}
                        value={flickStick.name}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="accessory-flick-stick-description-input"
                        label="Flick Stick Description"
                        variant="outlined"
                        name="description"
                        fullWidth
                        multiline
                        onChange={handleChange}
                        value={flickStick.description}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        id="accessory-flick-stick-colour-input"
                        label="Flick Stick Colour"
                        variant="outlined"
                        name="colour"
                        multiline
                        fullWidth
                        onChange={handleChange}
                        value={flickStick.colour}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="accessory-flick-stick-price-input"
                        label="Price"
                        variant="outlined"
                        name="price"
                        fullWidth
                        onChange={handleChange}
                        value={flickStick.price}
                    />
                </Grid>
                <Grid item container justify="space-between">
                    <Grid item xs={8}>
                        <FileInput
                            handleFileChange={handleFileChange}
                            resetFile={resetFile}
                            setResetFile={setResetFile}
                        />
                    </Grid>
                    <Grid item xs={4} container justify="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit FS
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default FlickStick;
