import React, { useState } from 'react';

// global state
import { useCurtainContext } from '../../config/CurtainCoContext'
import { ACTIONS } from '../../config/stateReducer'

// routing
import { Link, Redirect } from "react-router-dom";

// material ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// material icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { registerUser, loginUser } from "../../services/authServices";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
    }
}));




export default function SignUp() {
    const classes = useStyles();

    const { state, dispatch } = useCurtainContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    function handleRegister(e) {
        e.preventDefault()

        let userDetails = {
            email: email,
            password: password,
            title: "Mr",
            fullName: `${firstName} ${lastName}`,
            phone: '0400123456',
            // companyName: "My Company",
            address1: "45 Street Ave",
            suburb: "Brisbane City",
            state: "QLD",
            postcode: '4000',
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


    return (

        <>

        {
            state.loggedIn
            ?   <Redirect to="/" />
            :   <Container component="main" maxWidth="xs">

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

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={handleFirstNameChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
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
                                        onChange={handlePasswordChange}
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