import api from "../config/api";

async function addPhoto(file) {
    const response = await api.post("/upload", file);
    return response;
}

// async function updateCollection(updatedCollection) {
//     const response = await api.put(
//         `/collections/${updatedCollection._id}`,
//         updatedCollection
//     );
//     return response;
// }

// async function deleteCollection(collectionToDelete) {
//     const response = await api.delete(
//         `/collections/${collectionToDelete._id}`,
//         collectionToDelete
//     );
//     return response;
// }

export {
    addPhoto,
    // updateCollection,
    // deleteCollection,
};
