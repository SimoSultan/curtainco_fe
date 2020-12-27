import React, { useState, useEffect, useRef } from "react";

import { Container, Paper } from "@material-ui/core";
import useStyles from "../AdminStyles";

import EditDeleteTrack from "./EditDeleteTrack";
import EditDeleteFabric from "./EditDeleteFabric";
import EditDeleteAccessory from "./EditDeleteAccessory";

function EditProduct({ editForm, editProductId, setEditProductId }) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Container>
                {editForm === "Track" ? (
                    <EditDeleteTrack
                        editProductId={editProductId}
                        setEditProductId={setEditProductId}
                    />
                ) : editForm === "Fabric" ? (
                    <EditDeleteFabric
                        editProductId={editProductId}
                        setEditProductId={setEditProductId}
                    />
                ) : editForm === "Accessory" ? (
                    <EditDeleteAccessory
                        editProductId={editProductId}
                        setEditProductId={setEditProductId}
                    />
                ) : (
                    ""
                )}
            </Container>
        </Paper>
    );
}

export default EditProduct;
