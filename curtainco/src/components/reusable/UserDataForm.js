import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { Link } from "react-router-dom";

import useStyles from "./UserDataFormStyles";

// HELPERS
import {
    getFirstNameFromFullName,
    getLastNameFromFullName,
    checkIfRequiredUserDataFormFieldsAreEmpty,
} from "../../helpers/userHelpers";

const states = ["QLD", "VIC", "NSW", "NT", "ACT", "WA", "SA", "TAS"];
const titles = ["Mr", "Mrs", "Miss", "Ms", "Mx", "Sir", "Dr"];

const menuItems = states.map((place) => (
    <option value={place} key={place}>
        {place}
    </option>
));
const titleItems = titles.map((title) => (
    <option value={title} key={title}>
        {title}
    </option>
));

export default function UserDataForm({
    currentUser,
    formTitle,
    handleFunctionFromParent,
    withAuth,
    headerInformation,
    buttonText,
    // buttonColor,
    withConsultMessage,
}) {
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        title: "",
        // leave the comma in here as it will break the split function I have on this variable
        fullName: `${firstName},${lastName}`,
        phone: "",
        companyName: "",
        address1: "",
        suburb: "",
        state: "",
        postcode: "",
    });

    useEffect(() => {
        if (currentUser !== null) {
            console.log(currentUser);
            setUserData(currentUser);
            setFirstName(getFirstNameFromFullName(currentUser.fullName));
            setLastName(getLastNameFromFullName(currentUser.fullName));
        }
    }, [currentUser]);

    const handleSelectChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleNameChange = (event) => {
        if (event.target.name === "firstName") {
            setFirstName(event.target.value);
            setUserData({
                ...userData,
                fullName: `${event.target.value},${lastName}`,
            });
        } else {
            setLastName(event.target.value);
            setUserData({
                ...userData,
                fullName: `${firstName},${event.target.value}`,
            });
        }
    };

    const handleTextChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    function clearFields() {
        setUserData({
            email: "",
            password: "",
            title: "",
            // leave the comma in here as it will break the split function I have on this variable
            fullName: ",",
            phone: "",
            companyName: "",
            address1: "",
            suburb: "",
            state: "",
            postcode: "",
        });
    }

    async function handleSubmitForm(e) {
        e.preventDefault();
        console.log(userData);

        if (checkIfRequiredUserDataFormFieldsAreEmpty(userData)) {
            return alert("Please complete all required fields.");
        }

        let error = await handleFunctionFromParent(userData);
        // if there is not error then clear the fields
        if (!error) clearFields();
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />

            <div className={classes.paper}>
                {headerInformation ? (
                    <>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            {formTitle}
                        </Typography>
                    </>
                ) : (
                    ""
                )}

                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmitForm}
                >
                    <Grid container spacing={2}>
                        {currentUser === null ||
                        (currentUser && !withConsultMessage) ? (
                            <>
                                <Grid item xs={12} sm={2}>
                                    <Select
                                        id="title"
                                        variant="outlined"
                                        value={userData.title}
                                        onChange={handleSelectChange}
                                        fullWidth
                                        name="title"
                                        autoComplete="honorific-prefix"
                                        native
                                    >
                                        {
                                            <option
                                                aria-label="None"
                                                disabled
                                                label="Title"
                                            />
                                        }{" "}
                                        {titleItems}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={firstName}
                                        onChange={handleNameChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={lastName}
                                        onChange={handleNameChange}
                                    />
                                </Grid>

                                {withAuth ? (
                                    <>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                value={userData.email}
                                                onChange={handleTextChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                value={userData.password}
                                                onChange={handleTextChange}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    ""
                                )}

                                <Grid item xs={12}>
                                    <Divider variant="middle" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Mobile Number"
                                        type="text"
                                        id="phone"
                                        autoComplete="tel"
                                        value={userData.phone}
                                        onChange={handleTextChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="companyName"
                                        label="Company"
                                        type="text"
                                        id="companyName"
                                        autoComplete="organization"
                                        value={userData.companyName}
                                        onChange={handleTextChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="address1"
                                        label="Street Address"
                                        type="text"
                                        id="address1"
                                        autoComplete="address-line1"
                                        value={userData.address1}
                                        onChange={handleTextChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="suburb"
                                        label="Suburb"
                                        type="text"
                                        id="suburb"
                                        autoComplete="address-level2"
                                        value={userData.suburb}
                                        onChange={handleTextChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        id="state"
                                        variant="outlined"
                                        value={userData.state}
                                        name="state"
                                        required
                                        onChange={handleSelectChange}
                                        fullWidth
                                        autoComplete="address-level1"
                                        native
                                    >
                                        {
                                            <option
                                                aria-label="None"
                                                disabled
                                                label="State"
                                            />
                                        }{" "}
                                        {menuItems}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="postcode"
                                        label="Post Code"
                                        type="text"
                                        id="postcode"
                                        autoComplete="postal-code"
                                        value={userData.postcode}
                                        onChange={handleTextChange}
                                    />
                                </Grid>
                            </>
                        ) : (
                            ""
                        )}

                        {withConsultMessage ? (
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    variant="outlined"
                                    label="Message Details"
                                    value={withConsultMessage.msg}
                                    required
                                    onChange={withConsultMessage.handleFunction}
                                    fullWidth
                                    multiline
                                    rows={6}
                                />
                            </Grid>
                        ) : (
                            ""
                        )}
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {buttonText}
                    </Button>

                    {withAuth ? (
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link className={classes.link} to="/login">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    ) : (
                        ""
                    )}
                </form>
            </div>
        </Container>
    );
}
