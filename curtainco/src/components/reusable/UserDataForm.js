import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { MenuItem } from "@material-ui/core";

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
    <MenuItem value={place} key={place}>
        {place}
    </MenuItem>
));
const titleItems = titles.map((title) => (
    <MenuItem value={title} key={title}>
        {title}
    </MenuItem>
));

export default function UserDataForm({
    user,
    formTitle,
    handleFunctionFromParent,
    withAuth,
    headerInformation,
    buttonText,
    // buttonColor,
    withConsultMessage,
}) {
    const classes = useStyles();

    if (!user) {
        user = {};
        user.email = "";
        user.password = "";
        user.title = "";
        // leave the comma in here as it will break the split function I have on this variable
        user.fullName = ",";
        user.phone = "";
        user.companyName = "";
        user.address1 = "";
        user.suburb = "";
        user.state = "";
        user.postcode = "";
    }

    // const { state } = useCurtainContext();
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [firstName, setFirstName] = useState(
        getFirstNameFromFullName(user.fullName)
    );
    const [lastName, setLastName] = useState(
        getLastNameFromFullName(user.fullName)
    );
    const [phone, setPhone] = useState(user.phone);
    const [companyName, setCompanyName] = useState(user.companyName);
    const [address1, setAddress1] = useState(user.address1);
    const [suburb, setSuburb] = useState(user.suburb);
    const [addressState, setAddressState] = useState(user.addressState);
    const [postCode, setPostCode] = useState(user.postcode);
    const [title, setTitle] = useState(user.title);

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }

    function handlePhoneChange(e) {
        setPhone(e.target.value);
    }

    function handleCompanyChange(e) {
        setCompanyName(e.target.value);
    }

    function handleAddressChange(e) {
        setAddress1(e.target.value);
    }

    function handleSuburbChange(e) {
        setSuburb(e.target.value);
    }

    function handleAddressStateChange(e) {
        setAddressState(e.target.value);
    }

    function handlePostCodeChange(e) {
        setPostCode(e.target.value);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function clearFields() {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setCompanyName("");
        setAddress1("");
        setAddressState("");
        setSuburb("");
        setPostCode("");
        setTitle("");
    }

    async function handleSubmitForm(e) {
        e.preventDefault();

        let userDetails = {
            email: email,
            password: password,
            fullName: `${firstName},${lastName}`,
            phone: phone,
            companyName: companyName,
            address1: address1,
            suburb: suburb,
            state: addressState,
            postcode: postCode,
            title: title,
        };

        if (checkIfRequiredUserDataFormFieldsAreEmpty(userDetails)) {
            return alert("Please complete all required fields.");
        }

        let error = await handleFunctionFromParent(userDetails);
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
                        {user && !withConsultMessage ? (
                            <>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        id="title"
                                        variant="outlined"
                                        label="Title"
                                        value={title ? title : ""}
                                        select
                                        onChange={handleTitleChange}
                                        fullWidth
                                        // defaultValue=""
                                        autoComplete="honorific-prefix"
                                    >
                                        {titleItems}
                                    </TextField>
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
                                        onChange={handleFirstNameChange}
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
                                        onChange={handleLastNameChange}
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
                                                value={email}
                                                onChange={handleEmailChange}
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
                                                value={password}
                                                onChange={handlePasswordChange}
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
                                        value={phone}
                                        onChange={handlePhoneChange}
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
                                        value={companyName}
                                        onChange={handleCompanyChange}
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
                                        value={address1}
                                        onChange={handleAddressChange}
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
                                        value={suburb}
                                        onChange={handleSuburbChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="state"
                                        variant="outlined"
                                        label="State"
                                        value={addressState ? addressState : ""}
                                        required
                                        select
                                        onChange={handleAddressStateChange}
                                        fullWidth
                                        // defaultValue=""
                                        // helperText="Please select your state"
                                        autoComplete="address-level1"
                                    >
                                        {menuItems}
                                    </TextField>
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
                                        value={postCode ? postCode : ""}
                                        onChange={handlePostCodeChange}
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
