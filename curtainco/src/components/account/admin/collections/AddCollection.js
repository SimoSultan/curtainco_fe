import React, { useState } from "react";
import CollectionForm from "../../../reusable/CollectionForm";
import { Container, Paper } from "@material-ui/core";

import { createCollection } from "../../../../services/collectionServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import useStyles from "../AdminStyles";

function AddCollection() {
    const classes = useStyles();
    const { dispatch } = useCurtainContext();
    const [collection, setCollection] = useState({
        name: "",
        description: "",
        imgUrl: "",
        price: "",
        track: "",
        fabric: "",
        accessory: "",
    });

    const handleSelectChange = (event) => {
        setCollection({
            ...collection,
            [event.target.name]: event.target.value,
        });
    };

    const handleTextChange = (event) => {
        setCollection({
            ...collection,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        // ADD THE PRODUCT ON THE DB
        // IF SUCCESSFUL, ADD PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        let addCollError = false;
        console.log(collection);
        createCollection(collection)
            .then((resp) => {
                if (resp.status === 201) {
                    dispatch({
                        type: ACTIONS.ADD_COLLECTION,
                        payload: collection,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Collection successfully added",
                        },
                    });
                } else {
                    addCollError = `An error ocurred on adding product: Error Code: ${resp.status}. Message: ${resp.message}.`;
                    console.log(addCollError);
                }
            })
            .catch((error) => {
                addCollError = `An error ocurred on adding product: Error Code: ${error.status}. Message: ${error.message}.`;
                console.log(addCollError);
            });
    };

    return (
        <Paper className={classes.paper}>
            <Container>
                <CollectionForm
                    title={"Add Collection"}
                    buttonText={"Add"}
                    handleTextChange={handleTextChange}
                    handleSelectChange={handleSelectChange}
                    handleSubmit={handleSubmit}
                    handleRemove={false}
                    collection={collection}
                />
            </Container>
        </Paper>
    );
}

export default AddCollection;
