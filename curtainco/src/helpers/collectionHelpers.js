function getOneCollectionFromState(allCollections, id) {
    const collection = allCollections.filter((coll) => coll._id === id)[0];
    return collection;
}

module.exports = {
    getOneCollectionFromState,
};
