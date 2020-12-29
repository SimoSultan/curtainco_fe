import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";

import useStyles from "./AdminStyles";

import AllProducts from "./products/AllProducts";
import AllCollections from "./collections/AllCollections";
import AllConsults from "./requests/AllConsults";
import AllTestimonials from "./testimonials/AllTestimonials";
import AllUsers from "./users/AllUsers";
import BusinessDetails from "./business/BusinessDetails";
import AdminProfile from "./profile/AdminProfile";
import AddProduct from "./products/AddProduct";
import AddCollection from "./collections/AddCollection";
import EditCollection from "./collections/EditCollection";
import EditProduct from "./products/EditProduct";

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
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
    const [editProductId, setEditProductId] = useState("");
    const [editCollectionId, setEditCollectionId] = useState("");
    const [editForm, setEditForm] = useState("");

    function fillEditProductPage(event) {
        let categoryId = event.currentTarget.id;
        const productCategory = categoryId.split(",")[0];
        const productId = categoryId.split(",")[1];
        setEditProductId(productId);
        setEditForm(productCategory);
    }

    function fillEditCollectionPage(event) {
        const collectionId = event.currentTarget.id;
        setEditCollectionId(collectionId);
    }

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
                    <Tab label="add" {...a11yProps(0)} />
                    <Tab label="products" {...a11yProps(1)} />
                    <Tab label="collections" {...a11yProps(2)} />
                    <Tab label="users" {...a11yProps(3)} />
                    <Tab label="consultations" {...a11yProps(4)} />
                    <Tab label="business" {...a11yProps(5)} />
                    <Tab label="profile" {...a11yProps(6)} />
                    <Tab label="testimonials" {...a11yProps(7)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
                <Grid
                    container
                    justify="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item xs>
                        <AddProduct />
                    </Grid>
                    <Grid item xs>
                        <AddCollection />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Grid
                    container
                    justify="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item xs>
                        <AllProducts
                            fillEditProductPage={fillEditProductPage}
                            editProductId={editProductId}
                        />
                    </Grid>
                    <Grid item xs>
                        <EditProduct
                            editForm={editForm}
                            editProductId={editProductId}
                            setEditProductId={setEditProductId}
                        />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <Grid
                    container
                    justify="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item xs>
                        <AllCollections
                            fillEditCollectionPage={fillEditCollectionPage}
                            editCollectionId={editCollectionId}
                        />
                    </Grid>
                    <Grid item xs>
                        <EditCollection
                            editCollectionId={editCollectionId}
                            setEditCollectionId={setEditCollectionId}
                        />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <AllUsers />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
                <AllConsults />
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
                <BusinessDetails />
            </TabPanel>
            <TabPanel value={tabValue} index={6}>
                <AdminProfile />
            </TabPanel>
            <TabPanel value={tabValue} index={7}>
                <AllTestimonials />
            </TabPanel>
        </div>
    );
}
