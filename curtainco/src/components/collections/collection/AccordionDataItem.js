import React, { useState, useEffect } from "react"
import { Grid, Typography } from "@material-ui/core"
import useStyles from "../CollectionStyles"
import { capitalize } from "../../../helpers/appHelpers"
import { useCurtainContext } from "../../../config/CurtainCoContext"
import { ACTIONS } from "../../../config/stateReducer"

function AccordionDataItem({ data, handleCustomization }) {
    const classes = useStyles()
    const [productSelection, setProductSelection] = useState([])
    const [category, setCategory] = useState("")

    function handleSelected(event) {
        let productId = event.currentTarget.id.split(",")[0]
        let index = event.currentTarget.id.split(",")[1]
        let category = event.currentTarget.id.split(",")[2].toLowerCase()

        let tempSelection = [...productSelection]
        tempSelection[index] = productSelection[index] ? false : productId
        setProductSelection(tempSelection)
        handleCustomization(tempSelection, category)
    }

    useEffect(() => {
        let tempSelection = [false, false, false, false]
        let category = ""
        for (let i = 0; i < data.length; i++) {
            tempSelection[i] = data[i]._id
            category = data[i].category
        }
        setProductSelection(tempSelection)
        setCategory(category.toLowerCase())
    }, [data])

    // useEffect(() => {
    //     handleCustomization(productSelection, category)
    // }, [productSelection, category, handleCustomization])

    // THIS LINE:
    // sm={data.length === 4 ? 3 : 4}
    // DEALS WITH THE GRID FOR 3 OR LESS PRODUCTS
    const dataItem = data.map((product, index) => (
        <Grid
            item
            container
            direction="column"
            justify="space-around"
            xs={6}
            sm={data.length === 4 ? 3 : 4}
            key={`${product._id},${index}`}
        >
            <Grid
                item
                container
                justify="center"
                onClick={handleSelected}
                id={`${product._id},${index},${product.category}`}
            >
                <img
                    src={product.imgUrl}
                    alt={product.name}
                    className={
                        productSelection[index]
                            ? classes.accordionDataItemSelected
                            : classes.accordionDataItem
                    }
                />
            </Grid>
            <Grid item container justify="center">
                <Typography variant="subtitle1" component="p">
                    {capitalize(product.name)}
                </Typography>
            </Grid>
        </Grid>
    ))

    return dataItem
}

export default AccordionDataItem
