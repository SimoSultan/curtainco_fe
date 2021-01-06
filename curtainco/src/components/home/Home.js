import React from "react";

import { Typography } from "@material-ui/core";
import HeroBanner from "./HeroBanner";
import WhyCurtains from "./WhyCurtains";

function Home() {
    return (
        <>
            <Typography variant="h3">Home Page</Typography>
            <HeroBanner />
            <WhyCurtains />
        </>
    );
}

export default Home;
