import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import useStyles from "./AdminStyles";

import AllProducts from "./products/AllProducts";
import AllCollections from "./collections/AllCollections";
import AllRequests from "./requests/AllRequests";
import AllTestimonials from "./testimonials/AllTestimonials";
import AllUsers from "./users/AllUsers";
import BusinessDetails from "./business/BusinessDetails";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

export default function AdminTabs({ tabValue, handleChange }) {
    const classes = useStyles();

    return (
        <div className={classes.tabsRoot}>
            <AppBar position="static" color="default">
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="products" {...a11yProps(0)} />
                    <Tab label="collections" {...a11yProps(1)} />
                    <Tab label="users" {...a11yProps(2)} />
                    <Tab label="consultations" {...a11yProps(3)} />
                    <Tab label="testimonials" {...a11yProps(4)} />
                    <Tab label="business" {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
                <AllProducts />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <AllCollections />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <AllUsers />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <AllRequests />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
                <AllTestimonials />
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
                <BusinessDetails />
            </TabPanel>
        </div>
    );
}
