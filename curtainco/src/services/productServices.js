import api from "../config/api";
import { capitalize, isPhotoPresent } from "../helpers/appHelpers";
import { uploadPhotoToS3 } from "./uploadServices";

async function getAllProducts() {
    const response = await api.get("/products");
    return response;
}

async function createProduct(newProduct) {
    const response = await api.post("/products", newProduct);
    return response;
}

async function updateProduct(updatedProduct) {
    const response = await api.put(
        `/products/${updatedProduct._id}`,
        updatedProduct
    );
    return response;
}

async function deleteProduct(productToDelete) {
    const response = await api.delete(
        `/products/${productToDelete._id}`,
        productToDelete
    );
    return response;
}

async function createAccessory(newAccessory) {
    const response = await api.post("/accessory", newAccessory);
    return response;
}

async function submitProductToDbAndUpdateState(
    updateOrAdd,
    product,
    dispatch,
    ACTIONS,
    setResetFile,
    setPhoto,
    photo,
    resetProductForm
) {
    // UPDATE THE PRODUCT ON THE DB
    // IF SUCCESSFUL, UPDATE PRODUCT IN GLOBAL STATE AND SHOW SUCCESS SNACKBAR
    let editProdError = false;
    let tempProduct = { ...product };
    let userIsUpdatingPhoto = isPhotoPresent(photo);

    // UPLOAD THE PHOTO TO S3
    if (userIsUpdatingPhoto) {
        try {
            let s3Resp = await uploadPhotoToS3(photo);
            console.log(s3Resp);
            if (s3Resp.status === 201) {
                tempProduct.imgUrl = s3Resp.data.image.location;
                setResetFile(true);
                setPhoto({});
            }
        } catch (error) {
            editProdError = `Error ocurred when retrieving photo on ${updateOrAdd} ${tempProduct.category}. ${error}.`;
        }
    }

    // BLOCK THE UPDATE TO DATABASE IF THE IMAGE UPLOAD FAILED
    // editProdError WILL STILL BE FALSE IF THEY HAVEN'T UPLOADED A PHOTO
    // OR THERE WAS NO ERROR WHEN UPLOADING IT
    if (editProdError)
        return alert(
            `Something went wrong when ${updateOrAdd} photo to storage on ${tempProduct.category}`
        );

    try {
        let resp;
        if (updateOrAdd === "add") {
            resp = await createProduct(tempProduct);
        } else {
            resp = await updateProduct(tempProduct);
        }
        console.log(resp);
        if (
            (updateOrAdd === "add" && resp.status === 201) ||
            (updateOrAdd === "update" && resp.status === 200)
        ) {
            dispatch({
                type:
                    updateOrAdd === "add"
                        ? ACTIONS.ADD_PRODUCT
                        : ACTIONS.UPDATE_PRODUCT,
                payload: tempProduct,
            });
            dispatch({
                type: ACTIONS.SET_SNACKBAR,
                payload: {
                    open: true,
                    success: "success",
                    message: `${capitalize(
                        tempProduct.category
                    )} successfully ${
                        updateOrAdd === "add" ? "added" : "updated"
                    }`,
                },
            });
            setResetFile(true);
            setPhoto({});
            if (updateOrAdd === "add") resetProductForm();
            return resp;
        } else {
            editProdError = `An status error ocurred on ${updateOrAdd} ${tempProduct.category}: Error Code: ${resp.status}. Message: ${resp.message}.`;
            console.log(editProdError);
        }
    } catch (error) {
        editProdError = `An error ocurred on ${updateOrAdd} ${tempProduct.category}. ${error}.`;
    }
    return editProdError;
}

export {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createAccessory,
    submitProductToDbAndUpdateState,
};
