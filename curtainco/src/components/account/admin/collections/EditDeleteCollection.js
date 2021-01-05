import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";

import CollectionForm from "../../../reusable/CollectionForm";
import {
    deleteCollection,
    submitCollectionToDbAndUpdateState,
} from "../../../../services/collectionServices";
import { useCurtainContext } from "../../../../config/CurtainCoContext";
import { ACTIONS } from "../../../../config/stateReducer";
import { getOneCollectionFromState } from "../../../../helpers/collectionHelpers";
import useStyles from "../AdminStyles";

function EditDeleteCollection({ editCollectionId, setEditCollectionId }) {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();
    const [resetFile, setResetFile] = useState(false);
    const [photo, setPhoto] = useState({});
    const [tracksArray, setTracksArray] = useState(["", "", "", ""]);
    const [fabricsArray, setFabricsArray] = useState(["", "", "", ""]);
    const [accessoryArray, setAccessoryArray] = useState(["", "", "", ""]);
    const [previousCollection, setPreviousCollection] = useState(
        editCollectionId
    );
    const [collection, setCollection] = useState({
        _id: "",
        name: "",
        description: "",
        imgUrl: "",
        price: "",
        track: [],
        fabric: [],
        accessory: [],
        trackTip: "",
        accessoryTip: "",
        fabricTip: "",
    });

    function resetCollectionForm() {
        setCollection({
            _id: "",
            name: "",
            description: "",
            imgUrl: "",
            price: "",
            track: [],
            fabric: [],
            accessory: [],
            trackTip: "",
            accessoryTip: "",
            fabricTip: "",
        });
    }

    function handleFileChange(file) {
        console.log(file);
        setPhoto(file);
    }

    useEffect(() => {
        // this resets the file in the FileInput component on
        // a product change / update to form
        if (editCollectionId !== previousCollection) {
            setPreviousCollection(editCollectionId);
            setResetFile(true);
        }
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
                trackTip: collectionBeingUpdated.trackTip,
                accessoryTip: collectionBeingUpdated.accessoryTip,
                fabricTip: collectionBeingUpdated.fabricTip,
            });
            setTracksArray(collectionBeingUpdated.track);
            setFabricsArray(collectionBeingUpdated.fabric);
            setAccessoryArray(collectionBeingUpdated.accessory);
        } else {
            resetCollectionForm();
        }
    }, [state.collections, editCollectionId, previousCollection]);

    function handleSelectChange(event) {
        let selectName = event.target.name.split("-")[0];
        let selectIndex = event.target.name.split("-")[1];
        switch (selectName) {
            case "track":
                let tempTracks = [...tracksArray];
                tempTracks[selectIndex] = event.target.value;
                setTracksArray(tempTracks);
                setCollection({ ...collection, track: tempTracks });
                break;
            case "fabric":
                let tempFabrics = [...fabricsArray];
                tempFabrics[selectIndex] = event.target.value;
                setFabricsArray(tempFabrics);
                setCollection({ ...collection, fabric: tempFabrics });
                break;
            case "accessory":
                let tempAccessories = [...accessoryArray];
                tempAccessories[selectIndex] = event.target.value;
                setAccessoryArray(tempAccessories);
                setCollection({ ...collection, accessory: tempAccessories });
                break;
            default:
                break;
        }
    }

    function handleTextChange(event) {
        setCollection({
            ...collection,
            [event.target.name]: event.target.value,
        });
    }

    async function handleUpdateCollection() {
        let respOrError = await submitCollectionToDbAndUpdateState(
            "update",
            collection,
            dispatch,
            ACTIONS,
            setResetFile,
            setPhoto,
            photo,
            resetCollectionForm
        );
        console.log(respOrError);
    }

    function handleRemoveCollection() {
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
                buttonText={"Update Collection"}
                handleTextChange={handleTextChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleUpdateCollection}
                handleRemove={handleRemoveCollection}
                collection={collection}
                handleFileChange={handleFileChange}
                setResetFile={setResetFile}
                resetFile={resetFile}
            />
        </Paper>
    );
}

export default EditDeleteCollection;
