import React from "react";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
import useStyles from "../CollectionStyles";
import { Link } from "react-router-dom";
import { capitalize } from "../../../helpers/appHelpers";

function CollectionItem({ data }) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Grid item container spacing={2}>
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
                <Grid item container direction="column" xs={8} spacing={2}>
                    <Grid item>
                        <Typography variant="h4" component="h4">
                            {capitalize(data.name)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{capitalize(data.description)}</Typography>
                    </Grid>
                    <Grid item container justify="flex-end" alignItems="center">
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
            </Grid>
        </Paper>
    );
}

export default CollectionItem;
