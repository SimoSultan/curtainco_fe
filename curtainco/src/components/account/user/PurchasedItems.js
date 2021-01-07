import React, { useState, useEffect } from "react"

import { Typography, Grid, Avatar } from "@material-ui/core"
import { capitalize, displayShortDate } from "../../../helpers/appHelpers"
import PurchasedCollection from "./PurchasedCollection"
import PurchasedProduct from "./PurchasedProduct"

function PurchasedItems({ orderItem }) {
    console.log(orderItem)
    const [isCollection, setIsCollection] = useState(false)
    let product = orderItem.item

    useEffect(() => {
        if (product.fabric && product.track && product.accessory) {
            setIsCollection(true)
        }
    }, [product])

    return (
        <>
            {/* THIS IS THE CONTAINER FOR EACH INDIVIDUAL PRODUCT 
        IN THE LIST OF ITEMS PURCHASED*/}

            {isCollection ? (
                <PurchasedCollection qty={orderItem.qty} collection={product} />
            ) : (
                <PurchasedProduct qty={orderItem.qty} product={product} />
            )}
        </>
    )
}

export default PurchasedItems
