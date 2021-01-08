function getOneCollectionFromState(allCollections, id) {
    const collection = allCollections.filter((coll) => coll._id === id)[0]
    return collection
}

function filterProductsInCollection(collection) {
    let error = false
    collection.accessory = collection.accessory.filter(
        (id) => id !== "noProduct"
    )
    collection.track = collection.track.filter((id) => id !== "noProduct")
    collection.fabric = collection.fabric.filter((id) => id !== "noProduct")

    // CHECK TO SEE IF THERE ARE DUPLICATES IN ANY OF THE ARRAYS
    if (hasDuplicates(collection.accessory))
        error =
            "There are duplicates in accessories. Are you sure wish to proceed?"
    if (hasDuplicates(collection.track))
        error = "There are duplicates in tracks. Are you sure wish to proceed?"
    if (hasDuplicates(collection.fabric))
        error = "There are duplicates in fabrics. Are you sure wish to proceed?"

    return { collection, error }
}

function hasDuplicates(array) {
    return new Set(array).size !== array.length
}

function checkIfUserIsRemovingAProduct(collection) {
    if (collection.track.includes("noProduct")) return true
    if (collection.fabric.includes("noProduct")) return true
    if (collection.accessory.includes("noProduct")) return true
    return false
}

function checkIfProductsExistInCollection(productArray, category) {
    if (productArray.length === 0) {
        return `You have no ${category} products, are you sure you want to continue?`
    }
    return false
}

function buildContentString(array, category) {
    console.log(array)
    console.log(category)
    if (array.length >= 2) {
        return category === "Accessory"
            ? `${array.length} Accessories`
            : `${array.length} ${category}s`
    } else if (array.length === 1) {
        return `${array.length} ${category}`
    } else {
        return ""
    }
}

module.exports = {
    getOneCollectionFromState,
    filterProductsInCollection,
    checkIfUserIsRemovingAProduct,
    checkIfProductsExistInCollection,
    buildContentString,
}
