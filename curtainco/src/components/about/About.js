import React from "react";

import { Typography } from "@material-ui/core";
import Story from "./Story";
import Success from "./Success";
import Testimonial from "./Testimonial";

function About() {
    return (
        <div>
            <Typography variant="h3">About Page</Typography>;
            <Story />
            <Success />
            <Testimonial />
        </div>
    );
}

export default About;
