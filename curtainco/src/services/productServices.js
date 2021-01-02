import api from "../config/api";

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

export {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createAccessory,
};
