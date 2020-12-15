import api from "../config/api";

async function getAllCollections() {
    const response = await api.get("/collections");
    return response;
}

export { getAllCollections };
