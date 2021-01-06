import { Grid, Typography } from "@material-ui/core"
import React from "react"
import TestimonialList from "./TestimonialList"

// MVP: A JSON file consisting of testimonials
// N2H: Testimonials coming from the server
function Testimonial() {
    // TODO - replace with a JSON file of testimonials
    const testimonials = [
        { id: 1, msg: "Noice" },
        { id: 2, msg: "Smort" },
        { id: 3, msg: "Kewl" },
    ]
    return (
        <Grid item container direction="column" sm={6} justify="center">
            <Grid item>
                <Typography variant="h4" component="h4">
                    What Our Clients Say
                </Typography>
            </Grid>
            <Grid item>
                <TestimonialList testimonials={testimonials} />
            </Grid>
        </Grid>
    )
}

export default Testimonial
