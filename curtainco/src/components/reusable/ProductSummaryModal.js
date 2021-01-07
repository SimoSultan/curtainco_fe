import React from "react"
import useStyles from "./ModalStyles"
import { Grid, Typography, IconButton } from "@material-ui/core"
import AddToCartButton from "./AddToCartButton"
import CloseIcon from "@material-ui/icons/Close"
import FabricModalSummary from "./FabricModalSummary"
import TrackModalSummary from "./TrackModalSummary"
import AccessoryModalSummary from "./AccessoryModalSummary"

function ProductSummaryModal({ data, title, handleCartClick, handleClose }) {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item container xs={5} justify="center" alignItems="center">
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
            <Grid
                item
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                xs={7}
                spacing={1}
            >
                <Grid
                    item
                    container
                    justify="space-between"
                    className={classes.closeButtonCont}
                >
                    <Grid item xs={9}>
                        <Typography variant="h3" component="h3">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            onClick={handleClose}
                            className={classes.closeButton}
                        >
                            <CloseIcon color="error" />
                        </IconButton>
                    </Grid>
                </Grid>
                {/* <Grid item>
                    <Typography>{message}</Typography>
                </Grid> */}
                <Grid item>
                    <Typography>Price: ${data.price}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Category: {data.category}</Typography>
                </Grid>
                <Grid item>
                    <Typography>{data.description}</Typography>
                </Grid>
                <Grid item>
                    {data.category === "Fabric" ? (
                        <FabricModalSummary product={data} />
                    ) : data.category === "Track" ? (
                        <TrackModalSummary product={data} />
                    ) : (
                        <AccessoryModalSummary product={data} />
                    )}
                </Grid>
                <Grid item container justify="flex-end" alignItems="center">
                    <AddToCartButton
                        icon={false}
                        text={"Add To Cart"}
                        handleClick={handleCartClick}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductSummaryModal
