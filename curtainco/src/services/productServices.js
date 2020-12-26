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

export { getAllProducts, createProduct, updateProduct };
