import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Button, Grid, Divider } from "@material-ui/core";
import { Link } from 'react-router-dom';

import useStyles from "./NavigationStyles";
import Contact from "./Contact";
import Legal from "./Legal";

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.footerRoot}>
            <CssBaseline />

            <footer className={classes.footer}>
                <Divider />
                <Grid container>
                    <Contact />

                    <Grid item sm={8} container justify="center" alignItems="center">
                        <Button variant="contained" color="primary" >
                            <Link to="/request" className={classes.link}>
                                Request Consultation
                                </Link>
                        </Button>
                    </Grid>

                    <Legal />
                </Grid>
            </footer>
        </div>
    );
}
