import React from 'react';
import { Grid, Typography } from '@material-ui/core';

function Success() {
    return (
        <Grid container item justify="center" spacing={2}>
            <Grid item sm={6}>
                <img
                    src="https://source.unsplash.com/random/300x300"
                    alt="Reflecting success"
                />
            </Grid>
            <Grid item sm={6}>
                <Typography variant="h3" component="h3">
                    Our Success
                </Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laboriosam hic non temporibus ipsa ex consectetur libero
                    doloremque maiores quidem consequuntur nemo delectus eum quo
                    sed error, quod distinctio nihil inventore.
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Success;
