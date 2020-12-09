import React, { useState } from 'react';

import { useCurtainContext } from '../../config/CurtainCoContext'
import { ACTIONS } from '../../config/stateReducer'

import { Link, Redirect } from "react-router-dom";

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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './AuthStyles'

import { loginUser } from '../../services/authServices'
import Copyright from './Copyright'


export default function SignIn() {
    const classes = useStyles();

    const { state, dispatch } = useCurtainContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    function handleLogin(e) {
        e.preventDefault()

        const userDetails = {email, password, rememberMe}

        // LOG THE USER IN
        loginUser(userDetails).then((resp) => {
            let currentUser = resp.data.user

            if(currentUser && resp.status === 200) {
                dispatch({
                    type: ACTIONS.LOGIN,
                    payload: currentUser
                })
            } else {
                console.log("didn't get the user returned when logging in");
            }

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

    function handleRememberMe() {
        setRememberMe(!rememberMe)
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
                                    checked={rememberMe}
                                    onClick={handleRememberMe}
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


