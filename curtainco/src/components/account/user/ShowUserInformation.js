import React from "react";

import Grid from "@material-ui/core/Grid";

function ShowUserInformation({ user }) {
    return (
        <Grid container direction="column">
            <Grid item>{user.title}</Grid>
            <Grid item>{user.email}</Grid>
            <Grid
                item
            >{`${user.address1}, ${user.suburb}, ${user.state}, ${user.postcode}`}</Grid>
            <Grid item>{user.phone}</Grid>
            <Grid item>{user.companyName}</Grid>
        </Grid>
    );
}

export default ShowUserInformation;
