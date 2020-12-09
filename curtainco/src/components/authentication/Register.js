import React, { useState } from 'react';

import { useCurtainContext } from '../../config/CurtainCoContext'
import { ACTIONS } from '../../config/stateReducer'

import { Link, Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './AuthStyles'

import { registerUser, loginUser } from "../../services/authServices";
import Copyright from './Copyright'
import { MenuItem } from '@material-ui/core';

const states = [
    'QLD',
    'VIC',
    'NSW',
    'NT',
    'ACT',
    'WA',
    'SA',
    'TAS',
]

const titles = [
    'Mr',
    'Mrs',
    'Miss',
    'Ms',
    'Mx',
    'Sir',
    'Dr',
    'Lady',
    'Lord',
]


const menuItems = states.map(place => <MenuItem value={place}>{place}</MenuItem>)
const titleItems = titles.map(title => <MenuItem value={title}>{title}</MenuItem>)



export default function SignUp() {
    const classes = useStyles();

    const { state, dispatch } = useCurtainContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [address1, setAddress1] = useState('')
    const [suburb, setSuburb] = useState('')
    const [addressState, setAddressState] = useState('')
    const [postCode, setPostCode] = useState('')
    const [title, setTitle] = useState('')

    function handleRegister(e) {
        e.preventDefault()

        // let userDetails = {
        //     email: email,
        //     password: password,
        //     // title: "Mr",
        //     fullName: `${firstName},${lastName}`,
        //     phone: '0400123456',
        //     // companyName: "My Company",
        //     address1: "45 Street Ave",
        //     suburb: "Brisbane City",
        //     state: "QLD",
        //     postcode: '4000',
        // }
        
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
        }


        // REGISTER THE USER
        registerUser(userDetails).then((regResp) => {

            if(regResp.status === 201) {
                dispatch({
                    type: ACTIONS.REGISTER,
                    payload: {
                        email,
                        password,
                        name: firstName + ',' + lastName,
                    }
                })
            }

        }).then(() => {
            
            // AFTER THE USER HAS BEEN CREATED LOG THE USER IN
            loginUser({ email, password }).then((logResp) => {
                let currentUser = logResp.data.user

                if(currentUser && logResp.status === 200) {
                    dispatch({
                        type: ACTIONS.LOGIN,
                        payload: currentUser
                    })

                    // UPON SUCCESSFUL CREATION AND LOGIN, CLEAR THE FIELDS
                    setEmail('')
                    setPassword('')
                    setFirstName('')
                    setLastName('')

                } else {
                    console.log("didn't get the user returned when signing up");
                }

            }).catch((error) => {
                console.log(`An error ocurred on login: ${error}.`);
            })
        })
        
        .catch((error) => {
            console.log(`An error ocurred on register: ${error}.`);
        })

    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleFirstNameChange(e) {
        setFirstName(e.target.value)
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value)
    }

    function handlePhoneChange(e) {
        setPhone(e.target.value)
    }

    function handleCompanyChange(e) {
        setCompanyName(e.target.value)
    }

    function handleAddressChange(e) {
        setAddress1(e.target.value)
    }

    function handleSuburbChange(e) {
        setSuburb(e.target.value)
    }

    function handleAddressStateChange(e) {
        setAddressState(e.target.value)
    }

    function handlePostCodeChange(e) {
        setPostCode(e.target.value)
    }

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }


    return (

        <> 
        {
            state.loggedIn

            ?   <Redirect to="/" />

            :   <Container component="main" maxWidth="sm">

                    <CssBaseline />

                    <div className={classes.paper}>

                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        <form className={classes.form} noValidate onSubmit={handleRegister}>

                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={2}>
                                    <TextField 
                                        id="title" 
                                        variant="outlined" 
                                        label="Title" 
                                        value={title} 
                                        required 
                                        select 
                                        onChange={handleTitleChange}
                                        fullWidth
                                        autoComplete="honorific-prefix"
                                    >
                                        { titleItems } 
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

                                <Grid item xs={12}>
                                    <Divider variant="middle"/>
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
                                        value={addressState} 
                                        required 
                                        select 
                                        onChange={handleAddressStateChange}
                                        fullWidth
                                        autoComplete="address-level1"
                                    >
                                        { menuItems } 
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
                                        value={postCode}
                                        onChange={handlePostCodeChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>

                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link className={classes.link} to="/login">
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>

                        </form>

                    </div>

                    <Box mt={5}>
                        <Copyright />
                    </Box>

                </Container>

        } 
        </>

    );
}