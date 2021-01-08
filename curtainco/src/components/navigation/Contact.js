import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Grid, Typography } from '@material-ui/core';

function Contact() {
  return (
    <Grid item container sm={2} direction='column'>
      <Grid item>
        <FacebookIcon />
        <InstagramIcon />
      </Grid>
      <Grid item>
        <Typography variant='body2' color="textSecondary">
          Phone Number
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='body2' color="textSecondary">
          marie@email.com
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Contact;
