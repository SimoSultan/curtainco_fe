import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import useStyles from "./ProductStyles";

import { useCurtainContext } from "../../../config/CurtainCoContext";
import { ACTIONS } from "../../../config/stateReducer";

function ProductItem({ productData }) {
    const classes = useStyles();
    const { state, dispatch } = useCurtainContext();

    function handleClick(e) {
        e.preventDefault();

        dispatch({
            type: ACTIONS.SET_MODAL,
            payload: {
                open: true,
                title: "Product Title",
                message: "Something about a product goes here",
                data: productData,
            },
        });
    }

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    Heading
                </Typography>
                <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleClick}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductItem;
