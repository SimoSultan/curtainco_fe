import api from "../config/api";
import { capitalize } from "../helpers/appHelpers";

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
    product,
    category,
    dispatch,
    ACTIONS,
    setResetFile,
    setPhoto
) {
    let editProdError = false;
    try {
        let resp = await updateProduct(product);
        console.log(resp);
        if (resp.status === 200) {
            dispatch({
                type: ACTIONS.UPDATE_PRODUCT,
                payload: product,
            });
            dispatch({
                type: ACTIONS.SET_SNACKBAR,
                payload: {
                    open: true,
                    success: "success",
                    message: `${capitalize(category)} successfully updated`,
                },
            });
            setResetFile(true);
            setPhoto({});
            return resp;
        } else {
            editProdError = `An status error ocurred on update ${category}: Error Code: ${resp.status}. Message: ${resp.message}.`;
            console.log(editProdError);
        }
    } catch (error) {
        editProdError = `An error ocurred on update ${category}: Error Code: ${error.status}. Message: ${error.message}.`;
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
