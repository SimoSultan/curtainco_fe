import api from "../config/api";

async function getAllCollections() {
    const response = await api.get("/collections");
    return response;
}

async function getOneCollection(id) {
    const response = await api.get(`/collections/${id}`);
    return response;
}

async function createCollection(newCollection) {
    const response = await api.post("/collections", newCollection);
    return response;
}

async function updateCollection(updatedCollection) {
    const response = await api.put(
        `/collections/${updatedCollection._id}`,
        updatedCollection
    );
    return response;
}

async function deleteCollection(collectionToDelete) {
    const response = await api.delete(
        `/collections/${collectionToDelete._id}`,
        collectionToDelete
    );
    return response;
}

export {
    getAllCollections,
    getOneCollection,
    createCollection,
    updateCollection,
    deleteCollection,
};
