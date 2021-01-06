import React from 'react';
import { Grid, Typography } from '@material-ui/core';

function PaymentSummary({ data }) {
  const { customer } = data;
  return (
    <Grid container>
      {/* <Grid
        item
        container
        xs={5}
        justify="center"
        alignItems="center"
      >
        <div role="img">
          <img
            src={
              state.modal.data.imgUrl === ""
                ? "https://source.unsplash.com/random"
                : state.modal.data.imgUrl
            }
            alt={state.modal.data.name}
            style={{ width: "70%" }}
          />
        </div>
      </Grid> */}
      <Grid
        item
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        xs={7}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h3" component="h3">
            {data._id}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {`Recipient: ${customer.fullName}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {/* TODO - consider changing to Paypal Input Address instead? */}
            {`Deliver To: ${customer.address1}, ${customer.suburb}, ${customer.state} ${customer.postcode}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {`Shipped: ${data.isProcessed ? "Yes" : "No"}`}
          </Typography>
        </Grid>
        {/* ORDER ITEMS HERE */}
        <Grid item>
          <Typography>
            {`Total Cost: $${data.totalPrice}`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PaymentSummary;
