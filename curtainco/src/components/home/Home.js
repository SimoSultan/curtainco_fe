import React from "react";

import { Grid, Typography } from "@material-ui/core";
import HeroBanner from "./HeroBanner";
import WhyCurtains from "./WhyCurtains";

function Home() {
    return (
        <Grid container>
            <HeroBanner />
            <WhyCurtains />
        </Grid>
    );
}

export default Home;
