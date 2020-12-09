import React, { useState } from 'react';

// import { useCurtainContext } from '../../config/CurtainCoContext'
// import { ACTIONS } from '../../config/stateReducer'
// import { Link } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './ConsultationStyles'

import { submitConsultationRequest } from '../../services/consultationServices'

import Copyright from '../authentication/Copyright'


export default function SignUp() {
    const classes = useStyles();

    // const { state, dispatch } = useCurtainContext()
    const [message, setMessage] = useState('')

    function handleSubmitRequest(e) {
        e.preventDefault()

        submitConsultationRequest({ message }).then((resp) => {
            console.log(resp);
        })
    }

    function handleMessageChange(e) {
        setMessage(e.target.value)
    }


    return (

        <Container component="main" maxWidth="xs">

            <CssBaseline />

            <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Send a Request
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleSubmitRequest}>

                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField 
                                id="message" 
                                variant="outlined" 
                                label="Message Details" 
                                value={message} 
                                required 
                                onChange={handleMessageChange}
                                fullWidth
                                multiline
                                rows={6}
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
                        Submit
                    </Button>

                </form>

            </div>

            <Box mt={5}>
                <Copyright />
            </Box>

        </Container>
    );
}