import React from "react";

// import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import useStyles from "../reusable/UserDataFormStyles";

function Copyright() {
    const classes = useStyles();
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            {/* <Link color="inherit" className={classes.link} to="https://material-ui.com/">
                Your Website
            </Link> */}
            {"The Curtain Co"} {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default Copyright;
