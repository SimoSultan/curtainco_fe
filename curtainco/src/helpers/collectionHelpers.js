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
    // SET INITIAL VARIABLES TO RETURN OUT OF FUNCTION
    let customPrice = 0
    let discount = 1

    // GET THE AMOUNT OF PRODUCTS IN ORIGINAL (NON-CUSTOMISED COLLECTION)
    const fabricOrig = collection.fabric.length
    const trackOrig = collection.track.length
    const accOrig = collection.accessory.length
    let originalAmountOfProducts = fabricOrig + trackOrig + accOrig

    // GET THE AMOUNT OF PRODUCTS IN USER'S CUSTOMISED COLLECTION
    let fabricCustom = customizedCollection.fabric.filter(
        (prod) => prod !== false
    ).length
    let trackCustom = customizedCollection.track.filter(
        (prod) => prod !== false
    ).length
    let accCustom = customizedCollection.accessory.filter(
        (prod) => prod !== false
    ).length
    let amountOfProductsPresent = trackCustom + fabricCustom + accCustom

    // GET THE SUM OF ALL THE PRODUCTS IN THE CUSTOMISED COLLECTION
    // THIS IS A CRITICAL PART OF HOW THE COST OF A COLLECTION IS DECIDED
    // CURRENT CALCULATION IS:
    //  IF A USER HAS > 66% OF PRODUCTS IN THE COLLECTION THEY GET THE BEST DISCOUNT
    //  IF A USER HAS BETWEEN 33 - 66% OF PRODUCTS THEY GET THE SECOND BEST DISCOUNT
    //  IF THE USER HAS LESS THAN 33% OF PRODUCTS THEY GET THE WORST DISCOUNT (BUT IT STILL IS A DISCOUNT)
    let totalPriceOfProductsInCollection = calculateTotalPriceOfCollection(
        customizedCollection,
        collection
    )

    // THIS IS THE PRICE OF THE COLLECTION SET BY ADMIN ON CREATION OF THE COLLECTION
    // THIS VALUE IS NOT BEING USED IN THE APP ANYWHERE ANYMORE
    const originalPrice = collection.price

    const {
        mostProductsMultiplier,
        someProductsMultiplier,
        littleProductsMultiplier,
    } = discounts

    // THESE ARE THE 33%/66%/100% COUNTERS THAT DETERMINE WHICH DISCOUNT TO APPLY
    let lessProductCount = originalAmountOfProducts * 0.333
    let middleProductCount = originalAmountOfProducts * 0.666
    let mostProductCount = originalAmountOfProducts * 1

    // 3.3 PRODUCTS = 4 PRODUCTS
    lessProductCount = Math.ceil(lessProductCount)
    middleProductCount = Math.ceil(middleProductCount)
    mostProductCount = Math.ceil(mostProductCount)

    console.log({ lessProductCount })
    console.log({ middleProductCount })
    console.log({ mostProductCount })

    // THIS SIMPLY DETERMINES WHICH DISCOUNT TO APPLY
    // AND RETURNS THE PRICE AND DISCOUNT WE SET AT THE START
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

// CALCULATE THE TOTAL PRICE OF ALL THE PRODUCTS IN THE COLLECTION THAT IS SELECTED CURRENTLY
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

// THIS CALCULATES THE TOTAL COST OF EACH CATEGORY IN A COLLECTION
function calculateTotalPriceOfCategoryOfProducts(
    customisedArray,
    originalArray
) {
    // THIS CHECK IS HERE FOR INITIAL LOAD
    // WHEN CUSTOMISING THE CATEGORIES, WE ONLY USE ID'S (STRINGS) AND FALSE
    // WHICH MAKES UP THE LENGTH OF THE ARRAY
    // FIRST WHEN customisedArray IS LOADED, IT IS AN ARRAY OF OBJECTS INSTEAD
    // WHEN IT IS AN ARRAY OF OBJECTS,
    // WE CALCULATE THE TOTAL PRICE BASED ON THE ORIGINAL ARRAY
    // BECAUSE BY DEFAULT A COLLECTION INCLUDES ALL PRODUCTS IN IT
    // AND USERS CAN REMOVE SOME IF THEY WANT
    if (customisedArray.includes(false)) {
        // GENERATE A UNIQUE ARRAY OF OBJECTS FROM ORIGINAL ARRAY
        // THIS JUST DEALS WITH DUPLICATES IF THEY ARE PRESENT
        const key = "_id"
        const arrayUniqueByKey = [
            ...new Map(originalArray.map((item) => [item[key], item])).values(),
        ]

        // AS WE DON'T KNOW THE PRICE OF THE PRODUCT IN THE CUSTOMISED ARRAY (ONLY THE ID OR FALSE)
        // WE HAVE TO FIND THE PRICE IN THE ORIGINAL ARRAY, BASED OFF THE ID IN THE CUSTOMISED ONE
        // THIS GENERATES AN ARRAY OF PRICES (NUMBERS) EQUAL TO THE LENGTH OF THE CUSTOMISED CATEGORY
        // I.E. THE AMOUNT OF PRODUCTS ARE SELECTED IN THE CUSTOMISED SCREEN
        let tempCustomised = []
        for (let i = 0; i < customisedArray.length; i++) {
            const element = customisedArray[i]
            const tempPrice = arrayUniqueByKey.filter(
                (el) => el._id === element
            )
            if (tempPrice[0] !== undefined) {
                tempCustomised.push(tempPrice[0].price)
            }
        }
        // SUM THE ARRAY OF PRICES
        return tempCustomised.reduce((a, b) => a + b, 0)
    } else {
        // GENERATES AN ARRAY OF NUMBERS FROM ORIGINAL ARRAY AND SUMS THEM
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
