import { Typography } from "@material-ui/core"
import React from "react"

// data would be from Testimonial Component:
// MVP: A json file consisting the testimonial
// N2H: from the server
function TestimonialItem({ msg }) {
    return <Typography variant="body1">{msg}</Typography>
}

export default TestimonialItem
