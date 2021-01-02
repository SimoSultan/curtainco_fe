import React, { useState } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import useStyles from "../../AdminStyles";
import FileInput from "../../../../reusable/FileInput";
import { addPhoto } from "../../../../../services/uploadServices";
import { createAccessory } from "../../../../../services/productServices";
import { ACTIONS } from "../../../../../config/stateReducer";
import { useCurtainContext } from "../../../../../config/CurtainCoContext";

function Other() {
    const classes = useStyles();
    const { dispatch } = useCurtainContext;
    const [photo, setPhoto] = useState({});
    const [resetFile, setResetFile] = useState(false);
    const [other, setOther] = useState({
        name: "",
        price: "",
        imgUrl: "",
    });

    function handleReset(resetComplete) {
        if (resetComplete) setResetFile(false);
    }

    function handleChange(event) {
        setOther({
            ...other,
            [event.target.name]: event.target.value,
        });
    }

    function handleFileChange(file) {
        console.log(file);
        setPhoto(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("---Other---");
        console.log(other);

        try {
            let s3Resp = await addPhoto(photo);
            console.log(s3Resp);
            // if (s3Resp.status === 201) {
            //     setOther({
            //         ...other,
            //         imgUrl: s3Resp.data.image.url,
            //     });
            //     // SAVE TO SB
            //     try {
            //         let dbResp = await createAccessory(other);
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
            //             setOther({name: "", price: "", imgUrl: "",})
            //             setResetFile(true)
            //         }
            //     } catch (error) {
            //         console.log(`Error saving flick stick to DB: ${error}`);
            //     }
            // }
        } catch (error) {
            console.log(`Error saving flick stick photo to S3: ${error}`);
        }
    }

    return (
        <div className={classes.accessoryCont}>
            <Typography variant="body1" className={classes.accessorySubHeading}>
                Other
            </Typography>
            <Grid container spacing={2} justify="center">
                <Grid item xs={8}>
                    <TextField
                        id="accessory-other-name-input"
                        label="Name"
                        variant="outlined"
                        name="name"
                        onChange={handleChange}
                        value={other.name}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="accessory-other-price-input"
                        label="Price"
                        variant="outlined"
                        name="price"
                        onChange={handleChange}
                        value={other.price}
                    />
                </Grid>
                <Grid item container justify="space-between">
                    <Grid item xs={8}>
                        <FileInput
                            handleFileChange={handleFileChange}
                            resetFile={resetFile}
                            cb={handleReset}
                        />
                    </Grid>
                    <Grid item xs={4} container justify="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit Oth
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Other;
