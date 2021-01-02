const sortACTIONS = {
    PRICE_LOW_TO_HIGH: "Price: Low to High",
    PRICE_HIGH_TO_LOW: "Price: High to Low",
    NAME_ALPHABETICAL: "Name: A to Z",
    NAME_ALPHABETICAL_REVERSE: "Name: Z to A",
    FEATURED: "Featured",
    CATEGORY: "Category",
};

function sortProducts(filteredProducts, filterSortBy) {
    switch (filterSortBy) {
        case sortACTIONS.PRICE_LOW_TO_HIGH:
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case sortACTIONS.PRICE_HIGH_TO_LOW:
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case sortACTIONS.NAME_ALPHABETICAL:
            filteredProducts.sort((a, b) =>
                a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            );
            break;
        case sortACTIONS.NAME_ALPHABETICAL_REVERSE:
            filteredProducts.sort((a, b) =>
                b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            );
            break;
        case sortACTIONS.FEATURED:
            alert("feature not yet built");
            break;
        case sortACTIONS.CATEGORY:
            filteredProducts.sort((a, b) =>
                a.category.toLowerCase().localeCompare(b.category.toLowerCase())
            );
            break;
        default:
            // if nothing is selected, sort the list alphabetically a -> z
            filteredProducts.sort((a, b) =>
                a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            );
            break;
    }

    return filteredProducts;
}

function filterByType(filteredProducts, types) {
    // THIS IS HOW THE TYPES OBJECT LOOKS
    // types = {
    //     fabric: false,
    //     track: false,
    //     accessory: false,
    //     inStock: false,
    // }
    let arr = [];

    // LOOP THROUGH AND ONLY GET THE KEYS THAT ARE TRUE
    for (const key in types) {
        if (types.hasOwnProperty(key)) {
            const value = types[key];
            if (value) arr.push(key);
        }
    }

    if (arr.length > 0) {
        filteredProducts = filteredProducts.filter((element) =>
            arr.includes(element.category.toLowerCase())
        );
    }

    return filteredProducts;
}

function searchProducts(filteredProducts, searchText) {
    if (searchText !== "") {
        filteredProducts = filteredProducts.filter(
            (element) =>
                element.name.toLowerCase().indexOf(searchText.toLowerCase()) !==
                -1
        );
    }

    return filteredProducts;
}

function getOneProductFromState(allProducts, id) {
    const product = allProducts.filter((prod) => prod._id === id)[0];
    return product;
}

module.exports = {
    sortProducts,
    filterByType,
    searchProducts,
    getOneProductFromState,
    sortACTIONS,
};
