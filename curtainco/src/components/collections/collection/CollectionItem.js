import React from "react"

import { Button, Grid, Paper, Typography } from "@material-ui/core"
import useStyles from "../CollectionStyles"
import { Link } from "react-router-dom"
import { capitalize } from "../../../helpers/appHelpers"
import AddToCartButton from "../../reusable/AddToCartButton"
import { addItemToCart } from "../../../services/cartServices"
import { useCurtainContext } from "../../../config/CurtainCoContext"
import { ACTIONS } from "../../../config/stateReducer"

function CollectionItem({ data }) {
    const classes = useStyles()
    const { dispatch } = useCurtainContext()

    function handleCartClick(event) {
        event.preventDefault()
        if (
            !window.confirm(
                "Do you want to add the full collection to your cart?"
            )
        ) {
            return
        }
        addItemToCart(data)
        dispatch({
            type: ACTIONS.SET_SNACKBAR,
            payload: {
                open: true,
                success: "success",
                message: "Added full collection to cart",
            },
        })
    }
    return (
        <Paper className={classes.paper}>
            <Grid item container spacing={2}>
                <Grid item xs={4}>
                    <div role="img">
                        <img
                            src={
                                data.imgUrl === ""
                                    ? "https://source.unsplash.com/random"
                                    : data.imgUrl
                            }
                            alt={data.name}
                            style={{ width: "70%" }}
                        />
                    </div>
                </Grid>
                <Grid item container direction="column" xs={8} spacing={2}>
                    <Grid item>
                        <Typography variant="h4" component="h4">
                            {capitalize(data.name)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{capitalize(data.description)}</Typography>
                    </Grid>
                    <Grid item>
                        <AddToCartButton
                            icon={true}
                            text={"Cart"}
                            handleClick={handleCartClick}
                        />
                    </Grid>
                    <Grid item container justify="flex-end" alignItems="center">
                        <Button variant="contained" color="primary">
                            <Link
                                className={classes.link}
                                to={`/collections/customise/${data._id}`}
                            >
                                Customise
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CollectionItem
