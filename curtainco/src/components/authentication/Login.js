import React, { useState, useEffect } from 'react';

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
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

// material icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { loginUser } from '../../services/authServices'

function Copyright() {
    const classes = useStyles();
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" className={classes.link} to="https://material-ui.com/">
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
    }
}));





export default function SignIn() {
    const classes = useStyles();

    const { state, dispatch } = useCurtainContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e) {
        e.preventDefault()

        // if(state.users.length < 1) return (alert('Please sign up first'))
        // const user = state.users.find(user => user.email === email && user.password === password)
        // if(!user) return (alert("User doesn't exist"))

        const userDetails = {email, password}

        loginUser(userDetails).then((resp) => {
            let currentUser = resp.user
            dispatch({
                type: ACTIONS.LOGIN,
                payload: currentUser
            })

            setEmail('')
            setPassword('')

        }).catch((error) => {
            console.log(`An error ocurred on login: ${error}.`);
        })
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    useEffect(() => {
        console.log(state);
    }, [state])

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
                                Sign in
                            </Typography>

                            <form className={classes.form} noValidate onSubmit={handleLogin}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={handleEmailChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handlePasswordChange}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >Sign In
                                </Button>

                                <Grid container>
                                    <Grid item xs>
                                        <Link className={classes.link} to="/">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link className={classes.link} to="/register">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>

                        <Box mt={8}>
                            <Copyright />
                        </Box>

                    </Container>

            }

        </>


    );
}


