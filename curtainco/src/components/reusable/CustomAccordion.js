import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordionDetails: {
        width: "80%",
        margin: "0 auto",
    },
    dataItemSelected: {
        border: "1px solid black",
        padding: "8px 0 4px 0",
        cursor: "pointer",
    },
    dataItem: {
        padding: "8px 0 4px 0",
        cursor: "pointer",
    },
}));

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
            className={selected ? classes.dataItemSelected : classes.dataItem}
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
                <div className={classes.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>
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
