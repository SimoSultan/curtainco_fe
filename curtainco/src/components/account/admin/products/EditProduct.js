import React from "react";
import { Button, Grid } from "@material-ui/core";

function EditProduct() {
    return (
        <Grid container justify="center" alignItems="center" spacing={4}>
            <Button variant="outlined" color="primary">
                Edit Product
            </Button>
        </Grid>
    );
}

export default EditProduct;
