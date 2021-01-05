import React, { useState } from "react"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Grid } from "@material-ui/core"
import useStyles from "../collections/CollectionStyles"
import { capitalize } from "../../helpers/appHelpers"
import AccordionDataItem from "../collections/collection/AccordionDataItem"

export default function CustomAccordion({
    summary,
    data,
    tip,
    handleCustomization,
    open,
}) {
    const classes = useStyles()

    return (
        <Grid item container justify="space-around" alignItems="center">
            <Grid item xs={8}>
                <div className={classes.accordionRoot}>
                    <Accordion defaultExpanded={open}>
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
                                <AccordionDataItem
                                    data={data}
                                    handleCustomization={handleCustomization}
                                />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Grid>
            <Grid item>
                <Typography variant="h5" component="h5">
                    Designer Tip
                </Typography>
                <Typography>{capitalize(tip)}</Typography>
            </Grid>
        </Grid>
    )
}
