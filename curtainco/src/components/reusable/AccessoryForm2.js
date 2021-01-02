import React from "react";

import { Typography, Divider } from "@material-ui/core";
import FlickStick from "../account/admin/products/accessories/FlickStick";
import Automated from "../account/admin/products/accessories/Automated";
import TieBack from "../account/admin/products/accessories/TieBack";
import Other from "../account/admin/products/accessories/Other";

function AccessoryForm({ title }) {
    return (
        <>
            <Typography variant="h6" component="h6">
                {title}
            </Typography>
            <Divider />
            <FlickStick />
            <Divider />
            <Automated />
            <Divider />
            <TieBack />
            <Divider />
            <Other />
        </>
    );
}

export default AccessoryForm;
