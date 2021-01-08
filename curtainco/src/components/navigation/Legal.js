import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Copyright from "../authentication/Copyright";


function Legal() {
  return (
    <Grid item sm={2} container direction="column">
      <Typography variant='body2' color="textSecondary" align="center">
        Privacy-Terms
      </Typography>
      <Copyright />
      <Typography variant='body2' color="textSecondary" align="center">
        Site by Simon Curran & Phil Antiporda
      </Typography>
    </Grid>
  );
}

export default Legal;
