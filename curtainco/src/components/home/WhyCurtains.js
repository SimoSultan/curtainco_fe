import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';


function WhyCurtains() {
    return (
        <Grid item sm={6}>
            <Typography variant="h3" component="h3">
                Why Curtains?
            </Typography>
            <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur maiores veritatis tempora nostrum, laudantium
                repellat voluptatem, error hic ipsum in debitis doloribus nulla
                autem odit voluptas soluta asperiores deleniti perspiciatis!
            </Typography>
            <Button variant="contained" color="secondary">
                <Link to={`/collections`} className="link">
                    Collections
                </Link>
            </Button>

        </Grid>
    );
}

export default WhyCurtains
