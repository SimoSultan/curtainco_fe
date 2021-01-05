import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import useStyles from "../collections/CollectionStyles";

export default function CustomAccordion({ summary, data, tip }) {
    const classes = useStyles();
    const [selected, setSelected] = useState(true);

    const dataItems = data.map((product) => (
        <Grid
            item
            container
            direction="column"
            xs={6}
            sm={3}
            className={
                selected
                    ? classes.accordionDataItemSelected
                    : classes.accordionDataItem
            }
            spacing={1}
        >
            <Grid item container justify="center">
                <img
                    src={product.imgUrl}
                    alt={product.name}
                    style={{ width: "80%" }}
                />
            </Grid>
            <Grid item container justify="center">
                <Typography variant="subtitle1" component="p">
                    {product.name}
                </Typography>
            </Grid>
        </Grid>
    ));
    return (
        <Grid item container justify="space-around" alignItems="center">
            <Grid item xs={8}>
                <div className={classes.accordionRoot}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.accordionHeading}>
                                {summary}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Grid
                                container
                                justify="space-around"
                                alignItems="center"
                            >
                                {dataItems}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Grid>
            <Grid item>
                <Typography variant="h5" component="h5">
                    Designer Tip
                </Typography>
                <Typography>{tip}</Typography>
            </Grid>
        </Grid>
    );
}
