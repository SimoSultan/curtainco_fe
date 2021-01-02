import React from "react";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
import useStyles from "../CollectionStyles";
import { Link } from "react-router-dom";
import { capitalize } from "../../../helpers/appHelpers";

function CollectionItem({ data }) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Grid item container>
                <Grid item xs={4}>
                    <div role="img">
                        <img
                            src={
                                data.imgUrl === ""
                                    ? "https://source.unsplash.com/random"
                                    : data.imgUrl
                            }
                            alt={data.name}
                            style={{ width: "70%" }}
                        />
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h4" component="h4">
                        {capitalize(data.name)}
                    </Typography>
                    <Typography>{capitalize(data.description)}</Typography>
                    <Button variant="contained" color="primary">
                        <Link
                            className={classes.link}
                            to={`/collections/customise/${data._id}`}
                        >
                            Customise
                        </Link>
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CollectionItem;
