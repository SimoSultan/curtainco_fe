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
    let customPrice = 0
    let discount = 1

    const fabricOrig = collection.fabric.length
    const trackOrig = collection.track.length
    const accOrig = collection.accessory.length

    let fabricCustom = customizedCollection.fabric.filter(
        (prod) => prod !== false
    ).length
    let trackCustom = customizedCollection.track.filter(
        (prod) => prod !== false
    ).length
    let accCustom = customizedCollection.accessory.filter(
        (prod) => prod !== false
    ).length

    let totalPriceOfProductsInCollection = calculateTotalPriceOfCollection(
        customizedCollection,
        collection
    )

    let originalAmountOfProducts = fabricOrig + trackOrig + accOrig
    let amountOfProductsPresent = trackCustom + fabricCustom + accCustom
    const originalPrice = collection.price
    const {
        mostProducts,
        mostProductsMultiplier,
        someProducts,
        someProductsMultiplier,
        littleProducts,
        littleProductsMultiplier,
    } = discounts

    let lessProductCount = originalAmountOfProducts * 0.333
    let middleProductCount = originalAmountOfProducts * 0.666
    let mostProductCount = originalAmountOfProducts * 1

    lessProductCount = Math.ceil(lessProductCount)
    middleProductCount = Math.ceil(middleProductCount)
    mostProductCount = Math.ceil(mostProductCount)

    console.log({ lessProductCount })
    console.log({ middleProductCount })
    console.log({ mostProductCount })

    switch (true) {
        case amountOfProductsPresent <= lessProductCount:
            discount = littleProductsMultiplier
            customPrice =
                littleProductsMultiplier * totalPriceOfProductsInCollection
            break
        case amountOfProductsPresent <= middleProductCount:
            discount = someProductsMultiplier
            customPrice =
                someProductsMultiplier * totalPriceOfProductsInCollection
            break
        default:
            discount = mostProductsMultiplier
            customPrice =
                mostProductsMultiplier * totalPriceOfProductsInCollection
            break
    }

    return { customPrice, discount }
}

function calculateTotalPriceOfCollection(customizedCollection, collection) {
    const fabricPrice = calculateTotalPriceOfCategoryOfProducts(
        customizedCollection.fabric,
        collection.fabric
    )

    const trackPrice = calculateTotalPriceOfCategoryOfProducts(
        customizedCollection.track,
        collection.track
    )

    const accessoryPrice = calculateTotalPriceOfCategoryOfProducts(
        customizedCollection.accessory,
        collection.accessory
    )

    return fabricPrice + trackPrice + accessoryPrice
}

function calculateTotalPriceOfCategoryOfProducts(
    customisedArray,
    originalArray
) {
    if (customisedArray.includes(false)) {
        let tempCustomisedFabric = []
        const key = "_id"
        const arrayUniqueByKey = [
            ...new Map(originalArray.map((item) => [item[key], item])).values(),
        ]

        for (let i = 0; i < customisedArray.length; i++) {
            const element = customisedArray[i]
            const tempPrice = arrayUniqueByKey.filter(
                (el) => el._id === element
            )
            if (tempPrice[0] !== undefined) {
                tempCustomisedFabric.push(tempPrice[0].price)
            }
        }
        return tempCustomisedFabric.reduce((a, b) => a + b, 0)
    } else {
        let tempArray = originalArray.map((el) => el.price)
        return tempArray.reduce((a, b) => a + b, 0)
    }
}

export {
    getOneCollectionFromState,
    filterProductsInCollection,
    checkIfUserIsRemovingAProduct,
    checkIfProductsExistInCollection,
    buildContentString,
    calculateCustomizedCollectionPrice,
}
