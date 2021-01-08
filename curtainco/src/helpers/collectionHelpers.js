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

function calculateCustomizedCollectionPrice(
    customizedCollection,
    collection,
    discounts
) {
    let newPrice = 0
    
    const fabricOrig = collection.fabric.length
    const trackOrig = collection.track.length
    const accOrig = collection.accessory.length

    const fabricCustom = customizedCollection.fabric.filter((prod) => prod !== false)
        .length
    const trackCustom = customizedCollection.track.filter((prod) => prod !== false)
        .length
    const accCustom = customizedCollection.accessory.filter((prod) => prod !== false)
        .length
    
    const originalAmountOfProducts = 
    const amountOfProductsPresent = trackCustom + fabricCustom + accCustom
    const originalPrice = collection.price
    const {
        mostProducts,
        mostProductsMultiplier,
        someProducts,
        someProductsMultiplier,
        littleProducts,
        littleProductsMultiplier,
    } = discounts

    console.log(newPrice)
    console.log(fabric)
    console.log(amountOfProductsPresent)

    switch (amountOfProductsPresent) {
        case amountOfProductsPresent <= littleProducts:
            console.log("here")
            newPrice = littleProductsMultiplier * originalPrice
            break
        case amountOfProductsPresent <= someProducts:
            console.log("here2")
            newPrice = someProductsMultiplier * originalPrice
            break
        case amountOfProductsPresent <= mostProducts:
            console.log("here3")
            newPrice = mostProductsMultiplier * originalPrice
            break

        default:
            console.log("here4")
            newPrice = originalPrice
            break
    }
    console.log(newPrice)

    return newPrice
}

export {
    getOneCollectionFromState,
    filterProductsInCollection,
    checkIfUserIsRemovingAProduct,
    checkIfProductsExistInCollection,
    buildContentString,
    calculateCustomizedCollectionPrice,
}
