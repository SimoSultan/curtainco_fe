import React from "react"
import { Button, Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

function PageNotFound() {
    return (
        <Grid item container justify="center" alignItems="center" spacing={6}>
            <Grid item>
                <Typography variant="h6" component="h6">
                    Page Not Found
                </Typography>
            </Grid>
            <Grid item>
                <Link to="/">
                    <Button variant="contained" color="primary">
                        Go Back Home
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}

export default PageNotFound
