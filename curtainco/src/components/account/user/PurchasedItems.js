import React from "react"

import PurchasedCollection from "./PurchasedCollection"
import PurchasedProduct from "./PurchasedProduct"

function PurchasedItems({ orderItem }) {
    let tempData = orderItem.item

    return (
        <>
            {orderItem.item.fabric ? (
                <PurchasedCollection
                    qty={orderItem.qty}
                    collection={tempData}
                />
            ) : (
                <PurchasedProduct qty={orderItem.qty} product={tempData} />
            )}
        </>
    )
}

export default PurchasedItems
