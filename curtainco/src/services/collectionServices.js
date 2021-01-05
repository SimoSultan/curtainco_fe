import api from "../config/api"
import { isPhotoPresent } from "../helpers/appHelpers"
import { uploadPhotoToS3 } from "./uploadServices"

async function getAllCollections() {
    const response = await api.get("/collections")
    return response
}

async function getOneCollection(id) {
    const response = await api.get(`/collections/${id}`)
    return response
}

async function createCollection(newCollection) {
    const response = await api.post("/collections", newCollection)
    return response
}

async function updateCollection(updatedCollection) {
    const response = await api.put(
        `/collections/${updatedCollection._id}`,
        updatedCollection
    )
    return response
}

async function deleteCollection(collectionToDelete) {
    const response = await api.delete(
        `/collections/${collectionToDelete._id}`,
        collectionToDelete
    )
    return response
}

async function submitCollectionToDbAndUpdateState(
    updateOrAdd,
    collection,
    dispatch,
    ACTIONS,
    setResetFile,
    setPhoto,
    photo,
    resetCollectionForm
) {
    // UPDATE THE COLLECTION ON THE DB
    // IF SUCCESSFUL, UPDATE COLLECTION IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
    let editCollectionError = false
    let tempCollection = { ...collection }
    let userIsUpdatingPhoto = isPhotoPresent(photo)

    console.log({ userIsUpdatingPhoto })

    // UPLOAD THE PHOTO TO S3
    if (userIsUpdatingPhoto) {
        try {
            let s3Resp = await uploadPhotoToS3(photo)
            console.log(s3Resp)
            if (s3Resp.status === 201) {
                tempCollection.imgUrl = s3Resp.data.image.location
                setResetFile(true)
                setPhoto({})
            }
        } catch (error) {
            editCollectionError = `Error ocurred when retrieving photo on ${updateOrAdd} ${tempCollection.category}. ${error}.`
        }
    }

    // BLOCK THE UPDATE TO DATABASE IF THE IMAGE UPLOAD FAILED
    // editCollectionError WILL STILL BE FALSE IF THEY HAVEN'T UPLOADED A PHOTO
    // OR THERE WAS NO ERROR WHEN UPLOADING IT
    if (editCollectionError)
        return alert(
            `Something went wrong when ${updateOrAdd} photo to storage on ${tempCollection.category}`
        )

    try {
        let resp
        if (updateOrAdd === "add") {
            resp = await createCollection(tempCollection)
        } else {
            resp = await updateCollection(tempCollection)
        }
        console.log(resp)
        if (
            (updateOrAdd === "add" && resp.status === 201) ||
            (updateOrAdd === "update" && resp.status === 200)
        ) {
            dispatch({
                type:
                    updateOrAdd === "add"
                        ? ACTIONS.ADD_COLLECTION
                        : ACTIONS.UPDATE_COLLECTION,
                payload: tempCollection,
            })
            dispatch({
                type: ACTIONS.SET_SNACKBAR,
                payload: {
                    open: true,
                    success: "success",
                    message: `Collection successfully ${
                        updateOrAdd === "add" ? "added" : "updated"
                    }`,
                },
            })
            setResetFile(true)
            setPhoto({})
            if (updateOrAdd === "add") resetCollectionForm()
            return resp
        } else {
            editCollectionError = `An status error ocurred on ${updateOrAdd} collection: Error Code: ${resp.status}. Message: ${resp.message}.`
            console.log(editCollectionError)
        }
    } catch (error) {
        editCollectionError = `An error ocurred on ${updateOrAdd} collection. ${error}.`
    }
    return editCollectionError
}

export {
    getAllCollections,
    getOneCollection,
    createCollection,
    updateCollection,
    deleteCollection,
    submitCollectionToDbAndUpdateState,
}
