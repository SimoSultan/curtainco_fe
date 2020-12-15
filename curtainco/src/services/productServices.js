import api from "../config/api";

async function getAllProducts() {
    const response = await api.get("/products");
    return response;
}

export { getAllProducts };
