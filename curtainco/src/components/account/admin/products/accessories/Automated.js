import React, { useState } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import useStyles from "../../AdminStyles";
import FileInput from "../../../../reusable/FileInput";
import { addPhoto } from "../../../../../services/uploadServices";
import { createAccessory } from "../../../../../services/productServices";
import { ACTIONS } from "../../../../../config/stateReducer";
import { useCurtainContext } from "../../../../../config/CurtainCoContext";

function Automated() {
    const classes = useStyles();
    const { dispatch } = useCurtainContext;
    const [photo, setPhoto] = useState({});
    const [resetFile, setResetFile] = useState(false);
    const [automated, setAutomated] = useState({
        name: "",
        price: "",
        imgUrl: "",
        colour: "",
        description: "",
    });

    function handleChange(event) {
        setAutomated({
            ...automated,
            [event.target.name]: event.target.value,
        });
    }

    function handleFileChange(file) {
        console.log(file);
        setPhoto(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("---Automated---");
        console.log(automated);

        try {
            let s3Resp = await addPhoto(photo);
            console.log(s3Resp);
            // if (s3Resp.status === 201) {
            //     setAutomated({
            //         ...automated,
            //         imgUrl: s3Resp.data.image.url,
            //     });
            //     // SAVE TO SB
            //     try {
            //         let dbResp = await createAccessory(automated);
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
            //             setAutomated(name: "", price: "", imgUrl: "", colour: "", description: ""})
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
                Automated
            </Typography>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        id="accessory-automated-name-input"
                        label="Automated Name"
                        variant="outlined"
                        name="name"
                        onChange={handleChange}
                        value={automated.name}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="accessory-automated-description-input"
                        label="Automated Description"
                        variant="outlined"
                        name="description"
                        fullWidth
                        multiline
                        onChange={handleChange}
                        value={automated.description}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        id="accessory-automated-colour-input"
                        label="Automated Colour"
                        variant="outlined"
                        name="colour"
                        multiline
                        fullWidth
                        onChange={handleChange}
                        value={automated.colour}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="accessory-automated-price-input"
                        label="Price"
                        variant="outlined"
                        name="price"
                        fullWidth
                        onChange={handleChange}
                        value={automated.price}
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
                            Submit Aut
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Automated;
