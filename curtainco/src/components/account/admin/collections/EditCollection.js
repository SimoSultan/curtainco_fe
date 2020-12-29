import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";

import CollectionForm from "../../../reusable/CollectionForm";
import {
    updateCollection,
    deleteCollection,
} from "../../../../services/collectionServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import { getOneCollectionFromState } from "../../../../helpers/collectionHelpers";
import useStyles from "../AdminStyles";

function EditDeleteCollection({ editCollectionId, setEditCollectionId }) {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    const [collection, setCollection] = useState({
        _id: "",
        name: "",
        description: "",
        imgUrl: "",
        price: "",
        track: "",
        fabric: "",
        accessory: "",
    });

    useEffect(() => {
        // IF PRODUCT ID COMES THROUGH AS A PROP, SET THE FORM
        // OTHERWISE CLEAR THE FORM
        if (editCollectionId !== "") {
            const collectionBeingUpdated = getOneCollectionFromState(
                state.collections,
                editCollectionId
            );
            setCollection({
                _id: collectionBeingUpdated._id,
                name: collectionBeingUpdated.name,
                description: collectionBeingUpdated.description,
                imgUrl: collectionBeingUpdated.imgUrl,
                price: collectionBeingUpdated.price,
                track: collectionBeingUpdated.track,
                fabric: collectionBeingUpdated.fabric,
                accessory: collectionBeingUpdated.accessory,
            });
        } else {
            setCollection({
                _id: "",
                name: "",
                description: "",
                imgUrl: "",
                price: "",
                track: "",
                fabric: "",
                accessory: "",
            });
        }
    }, [state.collections, editCollectionId]);

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

    const handleUpdateProduct = () => {
        // UPDATE THE PRODUCT ON THE DB
        // IF SUCCESSFUL, UPDATE PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        let editCollError = false;
        updateCollection(collection)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 200) {
                    dispatch({
                        type: ACTIONS.UPDATE_COLLECTION,
                        payload: collection,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Collection successfully updated",
                        },
                    });
                } else {
                    editCollError = `An error ocurred on update product: Error Code: ${resp.status}. Message: ${resp.message}.`;
                    console.log(editCollError);
                }
            })
            .catch((error) => {
                editCollError = `An error ocurred on update product: Error Code: ${error.status}. Message: ${error.message}.`;
                console.log(editCollError);
            });
    };

    function handleRemoveProduct() {
        // DELETE THE PRODUCT ON THE DB
        // IF SUCCESSFUL, DELETE PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
        // THEN SET THE EDIT PRODUCT ID THAT THIS COMPONENT TAKES AS A PROP TO = "" TO RESET THE FORM
        deleteCollection(collection)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 202) {
                    dispatch({
                        type: ACTIONS.DELETE_COLLECTION,
                        payload: collection._id,
                    });
                    dispatch({
                        type: ACTIONS.SET_SNACKBAR,
                        payload: {
                            open: true,
                            success: "success",
                            message: "Collection successfully deleted",
                        },
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setEditCollectionId("");
    }

    // PASS IN TITLE AND TEXT FOR THE BUTTON TO THE TRACK FORM
    // PASS IN THE HANDLERS
    // PASS IN THE CURRENT TRACK
    return (
        <Paper className={classes.paper}>
            <CollectionForm
                title={"Edit Collection"}
                buttonText={"Update"}
                handleTextChange={handleTextChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleUpdateProduct}
                handleRemove={handleRemoveProduct}
                collection={editCollectionId === "" ? false : collection}
            />
        </Paper>
    );
}

export default EditDeleteCollection;
