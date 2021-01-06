import React from "react"

import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"

import useStyles from "../ProductStyles"

import { useCurtainContext } from "../../../config/CurtainCoContext"
import { ACTIONS } from "../../../config/stateReducer"
import { capitalize } from "../../../helpers/appHelpers"
import { addToCart } from "../../../services/cartServices"

function ProductItem({ productData }) {
    const classes = useStyles()
    const { dispatch } = useCurtainContext()

    function handleViewClick(event) {
        event.preventDefault()

        dispatch({
            type: ACTIONS.SET_MODAL,
            payload: {
                open: true,
                title: `${capitalize(productData.name)}`,
                message: `${capitalize(productData.description)}`,
                data: productData,
            },
        })
    }

    function handleCartClick(event) {
        event.preventDefault()
        addToCart(productData, dispatch)
    }

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={
                    productData.imgUrl === ""
                        ? "https://source.unsplash.com/random"
                        : productData.imgUrl
                }
                title={`${capitalize(productData.name)} Image`}
            />

            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h2">
                    {capitalize(productData.name)}
                </Typography>

                <Typography variant="body2">{`Amount: $${productData.price}`}</Typography>

                <Typography variant="body2">{`Type: ${productData.category}`}</Typography>
            </CardContent>

            <CardActions>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={handleViewClick}
                        >
                            View
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            size="small"
                            color="secondary"
                            variant="contained"
                            onClick={handleCartClick}
                        >
                            <AddIcon /> Add
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default ProductItem
